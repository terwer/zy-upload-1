// yarn add node-fetch -S
// yarn add babel-cli -S

import fetch from 'node-fetch';
import sendMail from "./mail.mjs"

const args = process.argv.slice(2)

console.log(args[1] + " repo size:");

fetch('https://api.github.com/repos/' + args[0] + '/' + args[1])
    .then(v => v.json()).then(async (v) => {
    const msize = (v['size'] / 1024).toFixed(2)
    const gsize = (v['size'] / 1024 / 1024).toFixed(2)
    console.log(msize + 'MB');
    console.log(gsize + 'GB');

    const repoName = args[0] + '/' + args[1]
    const to = "youweics@163.com";
    const title = "仓库【" + repoName + "】容量邮件通知邮件✔";
    const msg = "您的仓库【" + repoName + "】目前容量大小为<h1>" + msize + "MB</h1>相当于<h1>" + gsize + "GB</h1>请留意！";
    console.log("check token is=>" + process.env.QQMAIL_SMTP_TOKEN);

    const ret = await sendMail(to, title, msg);
    console.log("finish." + ret.response);
})
    .catch(err => console.log(err));

