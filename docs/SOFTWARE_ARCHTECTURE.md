# ソフトウェアアーキテクチャ定義書 - GraphNote (v1.0)

## 1. はじめに
本ドキュメントは、VS Code 拡張機能 **GraphNote** のソフトウェアアーキテクチャを定義するものである。本プロジェクトは、Jupyter Notebook の柔軟性とノードベースのワークフロー可視化を両立し、かつ実体ファイル（.py）ベースの管理を実現することを目的とする。

---

## 2. アーキテクチャ方針
本システムは **Clean Architecture** の原則に基づき、ビジネスロジックを外部フレームワーク（VS Code API, React Flow 等）から分離し、堅牢で拡張性の高い構造を目指す。

### 2.1 設計原則

本プロジェクトでは、保守性とテスト容易性を向上させるために以下の原則を徹底する。

* **依存性逆転の原則 (DIP)**: 上位モジュール（Service/UseCase）は下位モジュール（Infrastructure）の実装に依存せず、抽象（Interface）に依存する。
    * 例：`WorkflowService` は `VscodeFileStorage` に直接依存せず、`IFileStorage` インターフェースを通じて操作を行う。
* **単一責任の原則 (SRP)**: 各クラスおよびモジュールは単一の責務を持つ。
    * 例：`WorkflowService` はグラフの論理構造に専念し、`ReactFlowAdapter` は描画のためのデータ変換のみを担当する。
* **DRY (Don't Repeat Yourself)**: 共通ロジックを抽出し、重複を排除する。
    * 例：ID 生成（UUID）、ファイルパスの解決、共通のスタイル定義などをユーティリティ化して一貫性を保つ。
* **型安全性**: TypeScript の機能を最大限に活用し、`any` 型を排除する。
    * 厳密な型定義（Discriminated Unions 等）を用いることで、コンパイル時に多くのバグを検出し、実行時の安全性を確保する。
* **File-System as Truth**: ワークフローの状態は `.vflow` に、コードの実体は `.py` ファイルとしてローカルストレージに保持する。
* **Single Instance Shared State**: 実行時は単一の Python カーネルインスタンスを共有し、ノード間での変数共有を可能にする。

---

## 3. レイヤー構造

### 3.1. Core Layer (Domain & UseCase)
外部ライブラリに依存しない純粋な TypeScript ロジック。

* **Entities**:
    * `Workflow`: ノードとエッジの集合。グラフ構造の整合性（循環参照チェック等）を司る。
    * `Node`: ID、ファイルパス、座標、実行状態を持つ。
    * `Edge`: ノード間の接続情報。
* **Use Cases (Services)**:
    * `WorkflowService`: ノードの追加・削除、接続、トポロジカルソートの実行など、ワークフロー操作の中核ロジックを担当。
    * `ExecutionService`: 依存関係に基づいたコード実行のスケジューリングと、実行結果のハンドリングを行う。

### 3.2. Adapters Layer (Interface Adapters)
Core と外部環境（VS Code / Webview / Kernel）を仲介する。

* **Controllers**: Webview からの RPC メッセージ（Node追加、実行リクエスト）を受け取り、UseCase を呼び出す。
* **Gateways / Repositories (Interfaces)**:
    * `IWorkflowRepository`: `.vflow` ファイルの読み書き。
    * `IFileStorage`: `.py` ファイルの生成・編集・削除。
    * `IKernelAdapter`: Jupyter カーネルへの実行リクエスト。

### 3.3. Infrastructure Layer (Frameworks & Drivers)
具体的なライブラリや API の実装。

* **VS Code Integration**: `CustomEditorProvider` を介した専用エディタの提供。
* **Jupyter Extension Bridge**: 公式 Jupyter 拡張機能 API を利用したカーネル操作の具体的実装。
* **Webview Frontend**: React / React Flow / Monaco Editor を用いたインタラクティブな UI。

---

## 4. データモデル

### 4.1. Workflow Schema (.vflow)
```typescript
{
  "version": "1.0",
  "nodes": [
    {
      "id": "node_uuid_1",
      "path": "./.graphnote/cell_1.py",
      "position": { "x": 100, "y": 200 },
      "data": { "title": "Data Ingestion" }
    }
  ],
  "edges": [
    { "id": "edge_uuid_1", "source": "node_uuid_1", "target": "node_uuid_2" }
  ]
}
```

## 5. ディレクトリ構成

```
src/
├── core/                # 依存性のない純粋なビジネスロジック
│   ├── entities/        # Workflow, Node, Edge, ValueObjects
│   ├── use-cases/       # WorkflowService, ExecutionService
│   └── interfaces/      # IWorkflowRepository, IFileStorage, IKernelAdapter, IIdGenerator
├── adapters/            # 外部とのインターフェース変換
│   ├── persistence/     # ファイルシステムへの適合 (FileSystemWorkflowRepository等)
│   ├── jupyter/         # Jupyter 拡張 API への適合 (JupyterKernelAdapter等)
│   └── webview/         # Webview 通信（RPC）の変換層 (WebviewController等)
├── infrastructure/      # 具体的な実装（Framework 依存）
│   ├── vscode/          # CustomEditor, Commands, FileSystem 連携
│   └── external/        # 実装クラス（VscodeFileStorage, JupyterClient）
└── webview/             # UI ソースコード (React, React Flow, Monaco)
```

## 6. 実行プロセス (Interaction Flow)

1. UI 操作: ユーザーが Webview 上で「Run」をクリック。
2. Controller: Webview からのメッセージを受け取り、ExecutionService (UseCase) を呼び出す。
3. UseCase:
    - Workflow Entity から実行順序（トポロジカルソート）を取得。
    - IFileStorage を通じて各ノードのコード内容を取得。
4. Adapter: IKernelAdapter が抽象化された実行リクエストを VS Code Jupyter API へ転送。
5. Feedback: 実行結果を Presenter が整形し、Webview へ非同期で通知。