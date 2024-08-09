(function() {
    const vscode = acquireVsCodeApi();
    const container = document.getElementById('svg-container');

    window.addEventListener('message', event => {
        const message = event.data;
        switch (message.type) {
            case 'update':
                container.innerHTML = message.content;
                break;
        }
    });
})();