This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install the project packages:
```bash
npm i
```

Create a .env.development.local file with your API key and region. E.g.
```
VITAL_API_KEY=********
VITAL_API_REGION=eu
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Strategy

I'm taking advantage of NextJS' API Routes functionality to proxy the API requests. This prevents the API token from being visible and bypasses CORS issues. See `app/api/markers/route.ts`.

## Styling

I've chosen to keep the styling quite neutral and similar to the existing Try Vital visuals. Due to the time constraints I've focussed on presenting the information in as clear a manner as possible. 

## Libraries

### Chakra UI and Chakra Icons

Chosen as these are used in the current Vital app and simplified mtching the existing app visual style.

### Chakra React Select

A Chakra skin for the popular React Select component to facilitate multi-select behaviour for marker selection.

### React Use

A utility library that I often include in my projects. Here I'm using it for localStorage state management for the panels and debouncing of search for API marker filtering.

### React Query

Library for handling API queries that facilitates caching and handling paginated responses.

## Time Spent and compromises

I spent longer than I intended on this task - around 6 hours. Please see below for one part of this. There is some missing functionality for a full production-ready implementation:

- A search field for the panels list
- Editing and deleting existing panels
- More tests! However...
- - I haven't tested static components like PanelCard as these are pretty much covered by type checking.
- - I've tried to avoid testing implementations of 3rd party components, which is why I don't have a test for `useMarkers()` and why MarkersSelect is mocked. With correctly designed mocks it would be possible to write implementation-agnostic tests for these but that falls outside what was possible in the time.
- Handling request failures in the API proxy.

There are some smaller TODOs in the codebase which I'm happy to discuss.

## Server-side marker filtering

The main reason for the overspend was the implementation of the server-side marker filtering functionality. This was not included in the spec but the client-side filtering had a major limitation: the filtered marker list would be incomplete if the user had not scrolled all the way to the bottom of marker list.

You can enable this functionality in `utils/consts.ts` by updating `DEFAULT_MARKERS_SEARCH_STRATEGY`.