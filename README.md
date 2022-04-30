# electron-jh
お勉強用のwebviewアプリ

## 使ってみる
* master 0.0.2 を clone
  ```dotnetcli
  git clone https://github.com/take-i/electron-jh.git -b 0.0.2
  ```
* cloneしたリポジトリ内に移動
  ```dotnetcli
  cd electron-jh/
  ```

* electron をディレクトリ内にインストール
  ```dotnetcli
  npm install -D electron
  ```

* src/html/ 以下にローカル参照できるHTMLを追加
  
 静的なHTMLをhtmlリソース以下に作ります。
  ```dotnetcli
  cd src/html/
  echo "Hello World." > index.html
  cd ../../
  ```

* アプリケーションの作成

electron-packager を使って、アプリを作ります。intel mac しか動作確認していません。
```dotnetcli
npm run mac
```
同階層の以下にアプリが作られます。

```dotnetcli
JunkHack-darwin-x64/
├── JunkHack.app
├── LICENSE
├── LICENSES.chromium.html
└── version
```
* インストーラーの作成

electron-builder を使って、dmg形式のアプリを作ってみます。

```dotnetcli
npm run pack:mac
```

dist ディレクトリ以下に作成されます。

```dotnetcli
dist/
├── builder-debug.yml
├── builder-effective-config.yaml
├── junkhack-1.0.0.dmg
├── junkhack-1.0.0.dmg.blockmap
├── latest-mac.yml
└── mac
    └── junkhack.app
```

electron-builder で、app　だけ作ります。

```dotnetcli
npm run dist
```
アプリ形式だけ作られます。
```dotnetcli
dist/
├── builder-debug.yml
├── builder-effective-config.yaml
└── mac
    └── junkhack.app
```

