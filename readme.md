# form-data-kit

> library to parse, stringify, and expand FormData

## Install

```sh
npm install form-data-kit
```

## Usage

```ts
import { parse, stringify, expand } from 'form-data-kit';

parse(query: string): FormData
stringify(formData: FormData): string
expand(formData: FormData): object
```

## Parse

Parse takes a search param / query string, like the one from an url, and returns FormData

```js
import { parse } from "form-data-kit";

parse("one=foo&two=bar");
// FormData {
// 	[Symbol(state)]: [ { name: 'one', value: 'foo' }, { name: 'two', value: 'bar' } ]
// }
```

## Stringify

Parse takes FormData, and returns a search param / query string

```ts
import { stringify } from "form-data-kit";

const formData = new FormData();
formData.set("one", "foo");
formData.set("two", "bar");

stringify(formData);
// one=foo&two=bar
```

## Expand

Expands formData into an object. This method supports nesting, using `.` and `[number]` syntax.

```ts
import { expand } from "form-data-kit";

const formData = new FormData();
formData.append("one", "1");
formData.append("two", "2");
formData.append("nested.three", "3");
formData.append("array[0]", "4");
formData.append("array[1].five", "5");

expand(formData);
// {
// 	one: '1',
// 	two: '2',
// 	nested: {
// 		three: '3',
// 	},
// 	array: ['4', { five: '5' }],
// }
```
