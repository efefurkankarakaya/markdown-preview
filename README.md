# Markdown Preview

A live Markdown Preview app built on Next.js

## Technologies
- [Next.js](https://nextjs.org/)
- [Remark](https://github.com/remarkjs/remark) - to process `Markdown`` files
- [Rehype](https://github.com/rehypejs/rehype) - to process `HTML` files
- [Jest](https://jestjs.io/) - for `snapshot` and `unit testing``
- [Github Actions](https://docs.github.com/en/actions) - to manage `CI``
- [Husky](https://typicode.github.io/husky/getting-started.html) - to manage `Git Hooks`

## Running

Step 1: Clone the repository. <br />
`$ git clone https://github.com/efefurkankarakaya/markdown-preview` <br />

Step 2: Change directory to the project folder. <br />
`$ cd markdown-preview` <br />

### Docker

Step 3: Build a docker image <br />
`$ docker build -t markdown-preview` <br />

Step 4: Run the docker image <br />
`$ docker run -p 3000:3000 markdown-preview`

### pnpm

Step 3: Install dependencies <br />
`$ pnpm install` <br />

Step 4: Run the app <br />
`$ pnpm dev`

### yarn

Step 3: Install dependencies <br />
`$ yarn` <br />

Step 4: Run the app <br />
`$ yarn dev`

### npm

Step 3: Install dependencies <br />
`$ npm install` <br />

Step 4: Run the app <br />
`$ npm dev`