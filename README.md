# meteor-fiber-save-react-context

make the react 16 context-api for SSR using fibers

**This issue is solved in react 16.6.3**

## Why?

`React.createContext` is the new api to create a pair of `<Provider />` and `<Consumer />`. The Provider can pass down a value to the react tree, where the corresponding Consumer can get that value. 

Unfortunatly, the current implementation does not allow environments with co-routines (e.g. fibers) like meteor as every created Provider-Consumer-Pair stores the current value kind-of globally. This affects Server side rendering (SSR), because with meteor/co-routines a `ReactDOM.renderToString` can yield and pause its execution and a second invokation of `ReactDOM.renderToString` can start and alter globals like the mentioned global context value. Eventually, the first `ReactDOM.renderToString` will continue execution, but now with some context values from the second one! Imagine you have a `<Provider />` that provides the current user-data. It can now happen, that a user gets data from another user on the SSR result! Very dangerous!

This package solves this by patching `React.createContext` on the server, so that its internal value is stored and taken from the current fiber instead of beeing global. It does not change `React.createContext` on the client.

See https://github.com/facebook/react/issues/13854

## install and usage

simply do `meteor add panter:fiber-save-react-context`

This will patch every React.createContext on the server.



