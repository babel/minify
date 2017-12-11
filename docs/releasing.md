# Releasing

> If you are releasing a new package, you'll want to run `./scripts/npm-owner-update.sh` to add all owners to the new npm package after releasing. Or do it manually via `https://www.npmjs.com/package/package-name-here/access`.

If you need to update deps run `npm run clean` and then `npm run bootstrap`.

To get the changelog, run `npm run changelog` to print to the terminal.

Use `npm run publish`. It will run `lerna publish` (we use `--independent`) so it will prompt the version number for every package.
