
document.addEventListener('DOMContentLoaded', function () {

  // 获取所有带有 'gold-link-track' 类的链接
  const links = document.querySelectorAll('.gold-link-track');
  links.forEach(link => {
    const linkId = link.getAttribute('data-link-id');
    const countElement = document.getElementById(`count-${linkId}`);
    const downloadCount = localStorage.getItem(linkId) || 0;
    // countElement.textContent = `Download Count: ${downloadCount}`;
  });
  links.forEach(link => {
    link.addEventListener('click', function () {
      const linkId = link.getAttribute('data-link-id');
      const countElement = document.getElementById(`count-${linkId}`);
      let downloadCount = parseInt(localStorage.getItem(linkId)) || 0;
      // 发送 Google Analytics 事件
      gtag('event', 'download', {
        'event_category': 'code_download',
        'event_label': `code-${linkId}`,  // 根据实际文件名动态生成
      });
      // downloadCount++;
      // // 更新 localStorage 中的下载次数
      // localStorage.setItem(linkId, downloadCount);
      // // 更新页面上显示的下载次数
      // countElement.textContent = `Download Count: ${downloadCount}`;
    });
  });
});


// app.js
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(bodyParser.json());

// // 连接到 MongoDB 数据库
// mongoose.connect('mongodb://localhost:27017/downloads', { useNewUrlParser: true, useUnifiedTopology: true });

// // 创建一个下载次数模型
// const downloadSchema = new mongoose.Schema({
//   fileId: String,  // 文件的唯一标识符（例如文件名或其他标识）
//   downloadCount: { type: Number, default: 0 }
// });

// const Download = mongoose.model('Download', downloadSchema);

// // 获取下载次数
// app.get('/api/downloads/:fileId', async (req, res) => {
//   const fileId = req.params.fileId;
//   const download = await Download.findOne({ fileId });
//   res.json({ downloadCount: download ? download.downloadCount : 0 });
// });

// // 更新下载次数
// app.post('/api/downloads/:fileId', async (req, res) => {
//   const fileId = req.params.fileId;
//   let download = await Download.findOne({ fileId });
//   if (!download) {
//     download = new Download({ fileId });
//   }
//   download.downloadCount += 1;
//   await download.save();
//   res.json({ success: true });
// });

// // 启动服务器
// app.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// });

