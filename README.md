# Glob expander
Expand your globs into an equivalent list of directories.

This was primarily created to work around the [gaze issue](https://github.com/shama/gaze/pull/103) that prevents files being added in subdirectories from being picked up as part of the watch process.

Installs via npm: 

```bash
npm install glob-expander
```

## Example

Given the following directory structure:
```

gulpfile.js
public/
 js/
   app/
	   foo.js
   test/
     bar.js
server/
  routes/
		r1.js
		r2.js
```

In `gulpfile.js`:

```javascript
var expandGlob = require('glob-expander');

// Expand a single glob
expandGlob('public/**/*.js'); // ['public/js/*.js', 'public/js/app/*.js', 'public/js/test/*.js'] 

// Expand multiple globs 
expandGlob(['public/**/*.js', 'server/**']); 
// ['public/js/*.js', 'public/js/app/*.js', 'public/js/test/*.js', 'server/**', 'server/routes/**'] 
```
