# To Context or not to Context, that is the question

## When to use getContext and setContext for state

There is an "issue" with SvelteKit that has possible been blown up beyond all proportion, which is the use of global state. Originally this applied to using stores and now, with the release of Svelte 5, it's getting a whole new lease of life with Runes.

It doesn't help that the documentation on it doesn't _really_ provide a great explanation or example. It just tells you to be careful about mutating shared state on the server but the example it gives is very contrived and possibly contributes to confusion.

Because of this, I think a lot of people are given guidance that they need to use `getContext` and `setContext` as the solution but without really understanding why, when or more importantly when they don't need to.

So I thought I'd try to explain it with an example.

But let me start by saying that I don't pay much attention to claims that anything is needed in case there is some clueless beginner that may commit code that never gets checked, I think that's just silly reasoning - do we also litter our code with protections against the dropping database tables or deleting the app directory?

Let's assume that we're all professionals and code will be checked and ideally tested. What we want to do is to write the minimal, most efficient code necessary for the task.

So let's jump into the (hopefully) real-life example which is an ecommerce site with a shopping cart where you can add and remove items, with the UI updating to show the count and total, and the cart persisted and synchronized between multiple tabs.

Lets begin looking at the state implementation with the simplest approach:

### Direct export and import of global instance

The simplest approach is to create and export a cart instance in `src/lib/cart.svelte.ts` and import it wherever it's required. Anything interacting with the cart will automatically update as it's mutated (items are added or removed).

Wait! What? Isn't this the end of the world? Won't people be adding things into each other's carts?

No. You can use it with SSR and everything is fine!

The reason it works without issue is that we're only ever mutating things _on the client_. We load the cart from `localStorage`, we add and remove things from the local instance, and changes are persisted back to `localStorage`.

So that cart isn't used on the server then?

Yes, it is ... but it's never mutated. A single empty cart instance is created and re-used across all SSR requests but none of them ever change it because the mutations only ever happen as a result of user interactions.

Where I think the misunderstanding arose, possibly because of the original "store" name, is that people thought that mutating data on the server in an endpoint or form action handler would somehow communicate the change back to the client. Of course that's not how it works. The key thing is that the global state that is running on the server isn't mutated ... for _this_ example.

Now you can use `setContext` and `getContext` on the client if you want, but it's just complexity for no real reason. You don't mutate the server-side instance because it doesn't ever make any _sense_ to mutate it on the server.

But let's make it a little more interesting to show where it can be needed.

### Mutating server generated state

Suppose we make our site more complex and add support for multiple currencies, but instead of just having the same default currency for all visitors (which wouldn't affect our current approach) we instead want to select the appropriate default based on our visitors location ... but we still always want to give them the option to change in case we didn't guess right.

There are several ways to determine the initial currency from the request. We could use the HTTP `accept-language` header to match the clients preferred language regions with any that the store supports, or if we're using a host such as Google Cloud Platform that provides the visitors country as a custom HTTP header that is even easier, finally we could always lookup their client IP address in a GeoIP database.

We might do this in a `hooks.server.ts` `handle` function and populate a property on `locals`, and we could return that in the root `+layout.server.ts` `load` function so it's part of the `$page.data` store on the client, but how _exactly_ do we use that with our cart?

We can't bind it to any drop-down, becase mutating it won't trigger any reaction (we'd want the cart to switch to the different prices).

We really want it to be part of the cart instance, so we'd have:

```ts
class Cart {
	currency = $state('USD')

	// rest of cart implementation
}

export class cart = new Cart()
```

But when and where can we set it? A mistake would be to set it on the cart instance in the `+layout.ts` load function or the `+layout.svelte` template itself.

This is because during SSR the following happens:

- `+layout.server.ts` `load` executes on the server
- `+layout.ts` `load` _also_ executes on the server
- `+layout.svelte` is rendered on the server
- `+layout.ts` `load` re-executes on the client (using data embedded in the page)
- `+layout.svelte` is rendered on the client (the page is re-hydrated)

Any mutation we do from anywhere that executes on the server would be mutating the global shared instance on the server.

When it's setting a single propery such as in this case and the rest of the page rendering will be happening very quickly we may not even notice the issue but with enough users and overlapping requests it would eventually result in one user getting the defautl currency intended for another. Other state could be more noticeable, if we were adding things to an array for example.

Now there is actually an easy fix we could do which would be to simply wrap the mutation with an `if (browser) { }` check so only the client-side copy would ever be mutated but the recommendation is that load functions are pure and free of side-effects, so let's do things properly.
