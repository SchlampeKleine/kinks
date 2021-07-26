/* eslint-disable no-console */
const execa = require('execa');
const fs = require('fs');

(async () => {
  try {
    await execa('git', ['stash', 'push']);
    const folderName = 'autoDeploy';
    await execa('git', ['worktree', 'add', folderName, '--no-checkout', 'gh-pages']);
    // eslint-disable-next-line no-console
    console.log('Building started...');
    await execa('npm', ['run', 'build', '--production']);
    // Understand if it's dist or build folder
    await execa('git', ['--work-tree', folderName, 'add', '--all']);
    await execa('git', ['--work-tree', folderName, 'commit', '-m', 'gh-pages']);
    console.log('Pushing to gh-pages...');
    await execa('git', ['push', 'origin', 'HEAD:gh-pages', '--force']);
    await execa('rm', ['-r', folderName]);
    await execa('git', ['worktree', 'prune']);
    // await execa('git', ['checkout', '-f', 'main']);
    await execa('git', ['stash', 'pop']);
    await execa('git', ['branch', '-D', 'gh-pages']);
    console.log('Successfully deployed, check your settings');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
    process.exit(1);
  }
})();
