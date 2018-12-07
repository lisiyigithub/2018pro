
	function copyToClipboardChat(elementId) {
        // 创建元素用于复制
        var chat = document.createElement("input");

        // 获取复制内容
        var contentChat = document.getElementById("img2").alt;

        // 设置元素内容
        chat.setAttribute("value", contentChat);

        // 将元素插入页面进行调用
        document.body.appendChild(chat);

        // 复制内容
        chat.select();

        // 将内容复制到剪贴板
        document.execCommand("copy");

        // 删除创建元素
        document.body.removeChild(chat);

        //提示
        alert("您已成功复制" + chat.value + "，去微信粘贴看看吧"));
   }
