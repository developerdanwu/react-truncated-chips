# react-truncated-chips
A headless component to implement a truncated chips based on parent container/screen size for users!
Small bundle size of 2.1kb but can create super powerful UI experiences with a simple-to-use API.  
![](assets/chips-demo.gif)

### The problem
You need to truncate overflowing react elements (e.g. chips) based on the parent container/screen size.
You've tried overflow: hidden, but you need to render an overflow indicator. You toy around with state but it
quickly gets complex. You want a simple solution that works out of the box.

### This solution
This library offers a headless component that handles all of the logic for you. It's as simple as wrapping your
children components with the `TruncatedChipGroup` component. It will automatically help you calculate how many can be
shown in the given space! You can also render the children in reverse order if that's your thing!

## Features:  
✅ reverse rendering children  
✅ works with any react elements that accept a ref as children  
✅ custom overflow indicator  
✅ custom spacing between children components  
✅ responsive to parent container/screen size  
✅ small bundle size 2.1kb (minified + gzipped)

Some similar solutions already exists to achieve this sort of UI behaviour, but I couldn't find an actively maintained package
that fit all of my needs. Here are several components that inspired this that you may want to check out as well:
- [react-truncate-markup](https://github.com/patrik-piskay/react-truncate-markup)
- [react-truncate](https://github.com/pablosichert/react-truncate) - text truncation only
- [react-text-truncate](https://github.com/ShinyChang/React-Text-Truncate) - text truncation only

## Features:  
✅ reverse rendering children  
✅ works with any react elements that accept a ref as children  
✅ custom overflow indicator  
✅ custom spacing between children components  
✅ responsive to parent container/screen size  
✅ small bundle size 2.1kb (minified + gzipped)

## Install
```bash
  npm install --save react-truncated-chips

  or

  yarn add react-truncated-chips
```

Some similar solutions already exists to achieve this sort of UI behaviour, but I couldn't find an actively maintained package
that fit all of my needs. Here are several components that inspired this that you may want to check out as well:
- [react-truncate-markup](https://github.com/patrik-piskay/react-truncate-markup)
- [react-truncate](https://github.com/pablosichert/react-truncate) - text truncation only
- [react-text-truncate](https://github.com/ShinyChang/React-Text-Truncate) - text truncation only

## Documentation
Please see our storybook [here](https://react-truncated-chips.vercel.app)
