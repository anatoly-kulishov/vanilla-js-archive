[![CircleCI](https://circleci.com/gh/CIRCLECI-GWP/api-performance-testing-with-k6/tree/main.svg?style=svg)](https://circleci.com/gh/CIRCLECI-GWP/api-performance-testing-with-k6/tree/main)

<p align="center"><img src="https://avatars3.githubusercontent.com/u/59034516"></p>

## Running tests
### Running performance tests
 To run environment specific tests, we will use the following commands.

1. For create todo tests:
```bash
k6 run todos-testing.js
```

2. For create todo and fetch tests:
```bash
k6 run todo.js
```

3. For create todo and fetch tests with Trends:
```bash
k6 run create-todo-http-request.js
```

4. For create todo tests with Cloud output:
```bash
export K6_CLOUD_TOKEN=<your-token>

k6 run --out cloud create-todo-http-request.js
```

## Details

This repo is built following a tutorial published on CircleCI blog under the CircleCI Guest Writer Program.

- Blog post: [API Performance testing with k6][blog]
- Author's GitHub profile: [Waweru Mwaura][author]

### About CircleCI Guest Writer Program

Join a team of freelance writers and write about your favorite technology topics for the CircleCI blog. Read more about the program [here][gwp-program].

Reviewers: [Ron Powell][ron], [Stanley Ndagi][stan]


[blog]: https://circleci.com/blog/api-performance-testing-with-k6/
[author]: https://github.com/mwaz

[gwp-program]: https://circle.ci/3ahQxfu
[ron]: https://github.com/ronpowelljr
[stan]: https://github.com/NdagiStanley