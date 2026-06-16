# Dog Breed Finder

A React and Redux search interface for exploring dog breeds and sub-breeds through the public Dog CEO API. Visitors can combine multiple breed searches, filter into sub-breeds, browse image cards with pagination, and save favorite dogs locally across sessions.

## Product flow

```text
Dog CEO API -> Redux thunks -> breed/sub-breed results
                                  |
                    search + filter + paginate
                                  |
                                  v
                         saved-dogs collection
                         persisted in browser
```

## Features

- Loads the complete breed list for multi-select search
- Shows 50 random dog images for the initial gallery
- Searches multiple breeds and flattens results into one gallery
- Supports breed and sub-breed filtering
- Paginates image cards in groups of 12
- Saves selected dogs to a separate route
- Persists Redux state in the browser
- Uses Ant Design for search, cards, layout, buttons, and pagination

## Data source

The client uses [Dog CEO API](https://dog.ceo/dog-api/) endpoints for breed lists and random images. API availability, image licensing, and response shape remain external dependencies.

## Local setup

```bash
git clone https://github.com/alirazawatoo/dog-breed-finder-web.git
cd dog-breed-finder-web
npm install
npm start
```

The development server opens the search interface locally. No API key is required by the tracked service client.

## State and components

```text
src/
├── actions/          # Async breed, search, and filter operations
├── components/       # Search, cards, filters, navigation, saved dogs
├── containers/       # Redux-connected dog results
├── lib/services/     # Dog CEO HTTP client
├── Reducers/         # Search and saved-dog state
└── store.js          # Redux persistence setup
```

## Tests

```bash
npm test
```

The tracked test verifies that the application renders its primary title. Search behavior, external API failures, filters, pagination, and persistence do not have focused automated coverage.

## Current boundaries

- API failures are logged but are not surfaced as a dedicated user-facing error state.
- Loading and empty-result behavior is limited and should be made explicit.
- Saved images depend on browser persistence and external image URLs.
- Both `App.js` and `app.js` are tracked with the same application component.
- Several list items use positional keys, and saved-dog duplicate behavior is not documented.

## Next improvements

1. Add visible loading, empty, offline, and API-error states.
2. Cover search, sub-breed filters, pagination, and persistence with interaction tests.
3. Consolidate the duplicate application entry and normalize file naming.
4. Add favorite removal and duplicate prevention.
