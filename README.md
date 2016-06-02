# ajax-es6-fp
Promised Based Ajax Helper - With RoR in mind

Install

```bash
npm i --save @djforth/ajax-es6-fp
```

## Restful States

### Fetch

To fetch data:

```javascript
let Fetch = require('@djforth/ajax-es6-fp/fetch');

let get_data = Fetch('my/json/feed'); //Returns Promise

get_data.then((data)=>{
  // Do something with data
}).catch((err)=>{
  // Do something with error
});

```

### Create

To Create data:

```javascript
let Create = require('@djforth/ajax-es6-fp/create');

let post_data = Create('my/json/feed/new'); //Returns Promise

post_data({data:'some data'}).then((msg)=>{
  // Do something with return message
}).catch((err)=>{
  // Do something with error
});

```

### Destroy

To Destroy/delete data:

```javascript
let Destroy = require('@djforth/ajax-es6-fp/destroy');

let remove_data = Destroy('my/json/feed'); //Returns Promise

remove_data(1).then((msg)=>{ // Will post to my/json/feed/1
  // Do something with return message
}).catch((err)=>{
  // Do something with error
});

```

### Patch

To Patch/update data:

```javascript
let Patch = require('@djforth/ajax-es6-fp/patch');

let update_data = Patch('my/json/feed'); //Returns Promise

update_data({data: 'new data'}, 1).then((msg)=>{ // Will post to my/json/feed/1
  // Do something with return message
}).catch((err)=>{
  // Do something with error
});

```


# Bug reports

If you discover any bugs, feel free to create an issue on GitHub. Please add as much information as possible to help us fixing the possible bug. We also encourage you to help even more by forking and sending us a pull request.

https://github.com/djforth/ajax-es6-fp/issues

## Contribute

If you'd like to contribute, ajax-es6-fp is written using babel in ES6.

Please make sure any additional code should be covered in tests (Jasmine using karma).

If you need to run the test please use:

``` bash

npm test

```

or to rebuild the JS run:

``` bash

npm run build

```

## Maintainers

Adrian Stainforth (https://github.com/djforth)

# License

ajax-es6-fp is an open source project falling under the MIT License. By using, distributing, or contributing to this project, you accept and agree that all code within the ajax-es6-fp project are licensed under MIT license.