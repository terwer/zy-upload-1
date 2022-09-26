import nodemailer from "nodemailer";

export default async function sendMail(to, title, msg) {
    // 创建transporter
    const transporter = nodemailer.createTransport({
        host: "smtp.qq.com", // 邮箱的smtp地址
        auth: {
            user: "tangyouwei@qq.com", // 邮箱的smtp地址
            pass: process.env.QQMAIL_SMTP_TOKEN // 邮箱授权码
        }
    });

    // 配置邮件信息
    const mailInfo = {
        from: "tangyouwei@qq.com",
        to: to,
        subject: title, // Subject line
        text: "仓库容量邮件通知", // plain text body
        html: msg, // html body
    };

    // 发送邮件
    const ret = await transporter.sendMail(mailInfo);
    console.log("send mail finish to " + to);
    return ret;
}