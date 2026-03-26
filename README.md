# GraphNote 🚀

**GraphNote** は、Jupyter Notebook の直感的な実行環境と、ノードベースのワークフロー可視化を融合させるプロジェクトです。
本プロジェクトは、VS Code のプラグインとして実装することを想定しています。

「コードをバラバラに書きたい、でも実行順序は整理したい」というエンジニアのために設計されました。

## ✨ 特徴

- **Node-Based UI**: コードブロックを「箱」として配置し、矢印で実行順序を制御。
- **File-Based Single Instance**: 各ノードは独立した `.py` ファイルとして保存。実行時は単一の Python インスタンスを共有。
- **Git Friendly**: `.ipynb` のような巨大な JSON ではなく、純粋な Python ファイルとして差分管理が可能。
- **VS Code Native**: Monaco Editor を内蔵し、使い慣れた補完やハイライトをそのまま利用。

