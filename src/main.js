// アプリケーション作成用のモジュールを読み込み
const {app, BrowserWindow, Menu} = require('electron');
const path = require("path");

// メインウィンドウ
let mainWindow;

// 実行環境がmacOSならtrue
const isMac = (process.platform === 'darwin');

//アプリケーションメニューなし
// Menu.setApplicationMenu(false);

//メニューバー内容
// ElectronのMenuの設定
const templateMenu = [
  {
    
    label: app.name,
    submenu: [
        {
            role: 'about',
            label: `${app.name}について`
        },
        {
            role: 'close',
            label: 'ウィンドウを閉じる'
        },
        {
            role: 'quit',
            label: 'JunkHackを終了'
        },
    ]
  },
  {
    
    label: 'ファイル',
    submenu: [
        {
            label: '開き直す',
            accelerator: 'CmdOrCtrl+O',
            click: () => { createWindow() }
        },
        {
          label: '検索',
          accelerator: 'CmdOrCtrl+F',
          click: () => { createWindow2() }
      },
    ]
  },
  {
    
      label: '編集',
      submenu: [
          {
            role: 'cut',
            label: '切り取り'
          },
          {
              role: 'copy',
              label: 'コピー'
          },
          {
              role: 'paste',
              label: '貼り付け'
          },
          {role:'selectAll', label:'すべてを選択'},
          {role:'find', label:'すべてを選択'}
      ]
  },
  {
      label: '表示',
      submenu: [
          {
              label: 'Reload',
              accelerator: 'CmdOrCtrl+R',
              click(item, focusedWindow){
                  if(focusedWindow) focusedWindow.reload()
              },
          },
          {
              type: 'separator',
          },
          {
              role: 'resetzoom',
              label: '拡大縮小の解除'
          },
          {
              role: 'zoomin',
              label: '拡大'
          },
          {
              role: 'zoomout',
              label: '縮小'
          },
          {
              type: 'separator',
          },
          {
              role: 'togglefullscreen',
              label: 'フルスクリーンにする'
          }
      ]
  },
  {
    label:'ヘルプ',
    submenu: [
      {label:`${app.name} ヘルプ`},    // ToDo
      ...(isMac ? [ ] : [
        {type:'separator'} ,
        {label:`${app.name} ローカル版 ver 2022/0429` }
      ])
    ]
  }
];
//上で設定したメニューバーを表示
const menu = Menu.buildFromTemplate(templateMenu);
Menu.setApplicationMenu(menu);

// ファイル選択ダイアログを開く
function openFile() {
  dialog.showOpenDialog({ properties: ['openFile'] }, (filePath) => {

    // レンダラープロセスにイベントを飛ばす
    mainWindow.webContents.send('open_file', filePath);
  })
}

const createWindow = () => {
  // メインウィンドウを作成します
  mainWindow = new BrowserWindow({
    // webPreferences: {
    //   nodeIntegration: true,
    //   contextIsolation: false
    // },
    webPreferences: {
      // プリロードスクリプトは、レンダラープロセスが読み込まれる前に実行され、
      // レンダラーのグローバル（window や document など）と Node.js 環境の両方にアクセスできます。
      preload: path.join(__dirname, "preload.js"),
    },
    width: 1500, height: 850,
  });

  // メインウィンドウに表示するURLを指定します
  // （今回はmain.jsと同じディレクトリのindex.html）
  mainWindow.loadFile('./src/html/index.html');

  // デベロッパーツールの起動
  // mainWindow.webContents.openDevTools();

  // メインウィンドウが閉じられたときの処理
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

const createWindow2 = () => {
  // メインウィンドウを作成します
  mainWindow = new BrowserWindow({
    // webPreferences: {
    //   nodeIntegration: true,
    //   contextIsolation: false
    // },
    webPreferences: {
      // プリロードスクリプトは、レンダラープロセスが読み込まれる前に実行され、
      // レンダラーのグローバル（window や document など）と Node.js 環境の両方にアクセスできます。
      preload: path.join(__dirname, "preload.js"),
    },
    width: 1500, height: 850,
  });

  // メインウィンドウに表示するURLを指定します
  // （今回はmain.jsと同じディレクトリのindex.html）
  mainWindow.loadFile('./src/html/s.html');

  // デベロッパーツールの起動
  // mainWindow.webContents.openDevTools();

  // メインウィンドウが閉じられたときの処理
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

//  初期化が完了した時の処理
app.whenReady().then(() => {
  createWindow();

  // アプリケーションがアクティブになった時の処理(Macだと、Dockがクリックされた時）
  app.on("activate", () => {
    // メインウィンドウが消えている場合は再度メインウィンドウを作成する
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 全てのウィンドウが閉じたときの処理
app.on('window-all-closed', () => {
  // macOSのとき以外はアプリケーションを終了させます
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
// アプリケーションがアクティブになった時の処理(Macだと、Dockがクリックされた時）
app.on('activate', () => {
  // メインウィンドウが消えている場合は再度メインウィンドウを作成する
  if (mainWindow === null) {
    createWindow();
  }
});
