
const firebaseConfig = {
    apiKey: "AIzaSyCiWAzp_dpwbCtGhhewCW_NjrNj-ttfSio",
    authDomain: "numeric-polygon-000001.firebaseapp.com",
    projectId: "numeric-polygon-000001",
    storageBucket: "numeric-polygon-000001.firebasestorage.app",
    messagingSenderId: "162433300540",
    appId: "1:162433300540:web:aed1da4fb7767a102c2b39",
    measurementId: "G-TD04FXX86E"
};
document.addEventListener('DOMContentLoaded', function () {
    // 初始化 Firebase

    const app = initializeApp(firebaseConfig);
    const analytics = analytics(app);
    const database = database(app);

    // 为每个下载链接添加点击事件
    const downloadLinks = document.querySelectorAll('.gold-link-track');

    downloadLinks.forEach(link => {
        const linkId = link.getAttribute('data-link-id');
        const countDisplay = document.getElementById(`count-${linkId}`); // 显示下载次数的元素

        // 从 Firebase 获取下载次数并更新页面显示
        database.ref('downloads/' + linkId).once('value').then(snapshot => {
            const downloadCount = snapshot.val() || 0;
            countDisplay.textContent = `Downlaod Count: ${downloadCount}`;
        });

        // 给下载链接绑定点击事件
        link.addEventListener('click', function () {
            // 向 Firebase Analytics 发送下载事件
            analytics().logEvent('download', {
                item_name: linkId, // 使用文件ID作为事件标识
                item_category: 'file_downloads', // 文件下载类别
            });

            // 更新下载次数到 Firebase
            database.ref('downloads/' + linkId).transaction(currentCount => {
                return (currentCount || 0) + 1; // 增加下载次数
            });

            // 更新页面上的下载次数（本地显示）
            database.ref('downloads/' + linkId).once('value').then(snapshot => {
                const downloadCount = snapshot.val() || 0;
                countDisplay.textContent = `Downlaod Count: ${downloadCount}`;
            });
        });
    });
});