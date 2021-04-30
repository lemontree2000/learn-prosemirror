import { schema } from "prosemirror-schema-basic";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

import { undo, redo, history } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";

// import { DOMParser } from "prosemirror-model";

// 使用`schema.node`构建文档节点
const doc = schema.node("doc", null, [
  schema.node("paragraph", null, [schema.text("ONE.")]),
  schema.node("horizontal_rule"),
  schema.node("paragraph", null, [schema.text("Two !")]),
]);
console.log("doc>>>", doc);

const slice1 = doc.slice(0, 3)
console.log('slice1>>', slice1)
// console.log(slice1.toJSON())

// 根据schema 创建 state
const state = EditorState.create({
  schema,
  plugins: [
    history(),
    keymap({ "Mod-z": undo, "Mod-y": redo }),
    keymap(baseKeymap),
  ],
  doc,
});


// 可以用使用dom来初始化state, 即生成默认的文档
// <div id="content"><p>123</p></div>
// const content = document.getElementById("content")
// const state = EditorState.create({
//     doc: DOMParser.fromSchema(schema).parse(content)
// })

const view = new EditorView(document.body, {
  state,
  dispatchTransaction(transaction) {
    console.log("Document size went from >>", transaction.before.content.size);
    console.log("to >>", transaction.doc.content.size);
    console.log(transaction);
    const newState = view.state.apply(transaction);
    view.updateState(newState);
  },
});

console.log("state>>>>", state);
console.log("view>>>", view);
