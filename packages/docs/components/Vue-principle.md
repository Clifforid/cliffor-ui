# Vue底层原理-本质

## 1.虚拟DOM

- DOM工作原理
- 虚拟DOM本质
- 为什么要需要虚拟DOM



### DOM工作原理

大家思考一个问题：我们写的代码是 JS 代码，但是浏览器引擎是 C++ 写的

```js
const div = document.createElement("div");
```

浏览器引擎（C++）拿到你这个 JS 代码是如何处理的？

这里介绍一个东西：Web Interface Definition Language，WebIDL，翻译成中文“Web接口定义语言”。这里就是定义浏览器和 JS 之间如何进行通信，换句话说，浏览器（C++实现的）所提供的一些功能（本地功能）如何能够被 JS 调用。

通过 WebIDL，**浏览器开发者** 可以描述哪些类和方法能够被 JS 访问，以及这些方法应该如何映射到 JS 中的对象和方法。

假设现在有如下的 WebIDL 定义，用于创建 DOM 元素：

```web-idl
interface Document {
    Element createElement(DOMString localName);
};
```

这里就定义了一个 Document 的接口，该接口内部有一个 createElement，用来创建 DOM 元素的。

接下来 **浏览器开发者** 接下来使用 C++ 来实现这个接口：

```c++
class Document {
public:
  	// 实现了上面的接口，定义了具体如何来创建 DOM 元素
    Element* createElement(const std::string& tagName) {
        return new Element(tagName);
    }
};
```

接下来的步骤非常重要，需要生成绑定代码（绑定层），绑定了 JS 如何调用这个 C++ 方法：

```c++
// 这个绑定代码是由 WebIDL 编译器自动生成
// 这就是 JS 到 C++ 的绑定
// 换句话说，这段绑定代码决定了 JS 开发者可以调用哪些方法从而来调用上面的 C++ 方法
void Document_createElement(const v8::FunctionCallbackInfo<v8::Value>& args) {
    v8::Isolate* isolate = args.GetIsolate();
    v8::HandleScope handle_scope(isolate);
    Document* document = Unwrap<Document>(args.Holder());

    v8::String::Utf8Value utf8_value(isolate, args[0]);
    std::string localName(*utf8_value);

    Element* element = document->createElement(localName);
    v8::Local<v8::Value> result = WrapElement(isolate, element);
    args.GetReturnValue().Set(result);
}
```

有了绑定代码之后，接下来需要在 JS 引擎里面注册：

```c++
// 将上面的绑定代码注册到 JS 引擎里面
void RegisterDocument(v8::Local<v8::Object> global, v8::Isolate* isolate) {
    v8::Local<v8::FunctionTemplate> tmpl = v8::FunctionTemplate::New(isolate);
    tmpl->InstanceTemplate()->Set(isolate, "createElement", Document_createElement);
    global->Set(v8::String::NewFromUtf8(isolate, "Document"), tmpl->GetFunction());
}
```

**Web 开发者**在进行开发的时候，可以在 JS 文件中书写如下的代码：

```js
const i = 1;
document.createElement("div");
```

首先是 JS 引擎来执行 JS 代码，第一句是 JS 引擎完全能搞定的。第二句 JS 引擎发现你要创建 DOM 节点，会将其识别为一个 API 调用，然后向浏览器底层（渲染引擎）发出请求，由浏览器底层（渲染引擎）负责来创建这个 DOM 元素。浏览器底层创建完 DOM 元素之后，还需要给你最初的调用端返回一个结果，所谓最初的调用端，也就是 JS 代码中调用 DOM API 的地方。

如下图所示：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-04-29-075748.png" alt="image-20240429155747951" style="zoom:50%;" />

平时我们所指的真实 DOM，究竟是在指什么？

指的就是浏览器底层已经调用过 C++ 对应的 API 了

假设你在 JS 层面

```js
document.appendChild("div");
```

那么浏览器底层在调用对应的 C++ 代码的时候，还会涉及到浏览器重新渲染的相关内容，这又是一个很大的话题。

### 虚拟DOM本质

最初虚拟 DOM 是由 React 团队提出的：

>虚拟 DOM 是一种编程概念。在这个概念里， UI 以一种理想化的，或者说“虚拟的”表现形式被保存于内存中。

理论上来讲，无论你用什么样的结构，只要你将文档的结构能够展示出来，你的这种结构就是一种虚拟 DOM. 虽然理论是美好的，但实际上也只有 JS 对象适合干这个事情。

在 Vue 中，可以通过一个名叫 h 的函数，该函数的调用结果就是返回虚拟 DOM.

文档地址：https://cn.vuejs.org/api/render-function.html#h

下面是一个简单的示例：

父组件 App.vue

```vue
<template>
  <div class="app-container">
    <h1>这是App组件</h1>
    <Child name="李四" email="123@qq.com" />
    <component :is="vnode" />
  </div>
</template>

<script setup>
import { h } from 'vue'
import Child from '@/components/Child.vue'
const vnode = h(Child, {
  name: '李四',
  email: '123@qq.com'
})
console.log('vnode:', vnode)
</script>

<style scoped>
.app-container {
  width: 400px;
  border: 1px solid;
}
</style>
```

子组件 Child.vue

```vue
<template>
  <div class="child-container">
    <h3>这是子组件</h3>
    <p>姓名：{{ name }}</p>
    <p>email：{{ email }}</p>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  email: String
})
</script>

<style scoped>
.child-container {
  width: 200px;
  height: 200px;
  border: 1px solid;
}
</style>
```

通过上面的例子，我们可以得出一个结论：虚拟 DOM 的本质就是普通的 JS 对象。

### 为什么需要使用虚拟DOM

先来回顾早期的开发模式。

在最早期的时候，前端是通过手动操作 DOM 节点来编写代码的。

创建节点：

```js
// 创建一个新的<div>元素
var newDiv = document.createElement("div");
// 给这个新的<div>添加一些文本内容
var newContent = document.createTextNode("Hello, World!");
// 把文本内容添加到<div>中
newDiv.appendChild(newContent);
// 最后，把这个新的<div>添加到body中
document.body.appendChild(newDiv);
```

更新节点：

```js
// 假设我们有一个已存在的元素ID为'myElement'
var existingElement = document.getElementById("myElement");
// 更新文本内容
existingElement.textContent = "Updated content here!";
// 更新属性，例如改变样式
existingElement.style.color = "red";
```

删除节点：

```js
// 假设我们要删除ID为'myElement'的元素
var elementToRemove = document.getElementById("myElement");
// 获取父节点
var parent = elementToRemove.parentNode;
// 从父节点中移除这个元素
parent.removeChild(elementToRemove);
```

插入节点：

```js
// 创建新节点
var newNode = document.createElement("div");
newNode.textContent = "这是新的文本内容";
// 假设我们想把这个新节点插入到id为'myElement'的元素前面
var referenceNode = document.getElementById("myElement");
referenceNode.parentNode.insertBefore(newNode, referenceNode);
```

上面的代码，如果从编程范式的角度来看，是属于 **命令式编程**，这种命令式编程的性能一定是最高的。

这意味着，假如你要创建一个 div 的 DOM 节点，没有什么比 document.createElement("div") 这句代码的性能还要高。

虽然上面的方式是性能最高的，但是在实际开发中，开发者往往倾向于更加方便的方式。

```html
<div id="app">
  <!-- 需求：往这个节点内部添加一些其他的节点 -->
</div>
```

如果是采用传统的操作 DOM 节点的方式：

```js
// 获取app节点
var app = document.getElementById("app");

// 创建外层div
var messageDiv = document.createElement("div");
messageDiv.className = "message";

// 创建info子div
var infoDiv = document.createElement("div");
infoDiv.className = "info";

// 创建span元素并添加到infoDiv
var nameSpan = document.createElement("span");
nameSpan.textContent = "张三";
infoDiv.appendChild(nameSpan);

var dateSpan = document.createElement("span");
dateSpan.textContent = "2024.5.6";
infoDiv.appendChild(dateSpan);

// 将infoDiv添加到messageDiv
messageDiv.appendChild(infoDiv);

// 创建并添加<p>
var p = document.createElement("p");
p.textContent = "这是一堂讲解虚拟DOM的课";
messageDiv.appendChild(p);

// 创建btn子div
var btnDiv = document.createElement("div");
btnDiv.className = "btn";

// 创建a元素并添加到btnDiv
var removeBtn = document.createElement("a");
removeBtn.href = "#";
removeBtn.className = "removeBtn";
removeBtn.setAttribute("_id", "1");
removeBtn.textContent = "删除";
btnDiv.appendChild(removeBtn);

// 将btnDiv添加到messageDiv
messageDiv.appendChild(btnDiv);

// 将构建的messageDiv添加到app中
```

如果使用 innerHTML 的方式：

```js
var app = document.getElementById("app");

app.innerHTML += `
  <div class="message">
    <div class="info">
      <span>张三</span>
      <span>2024.5.6</span>
    </div>
    <p>这是一堂讲解虚拟DOM的课</p>
    <div class="btn">
      <a href="#" class="removeBtn" _id="1">删除</a>
    </div>
  </div>`;
```

虽然第一种方式性能最高，但是写起来 Web开发者 的心智负担也很高。

因此 Web开发者往往选择第二种，虽然性能要差一些，但是心智负担也没有那么高，写起来轻松一些。

为什么第二种性能要差一些？差在哪里？

原因很简单，第二种方式涉及到了两个层面的计算：

1. 解析字符串（JS层面）
2. 创建对应的 DOM 节点（DOM 层面）

实际上使用虚拟 DOM 也涉及到两个层面的计算：

1. 创建 JS 对象（虚拟DOM，属于 JS 层面）
2. 根据 JS 对象创建对应的 DOM 节点（DOM 层面）

这里我们不需要考虑同属于 JS 层面的计算，解析字符串和创建 JS 对象究竟谁快谁慢。只需要知道不同层面的计算，JS 层面的计算和 DOM 层面的计算，速度是完全不同的。

JS 层面创建 1千万个对象：

```js
console.time("time");
const arr = [];
for(let i=0;i<10000000;i++){
  let div = {
    tag : "div"
  };
  arr.push(div);
}
console.timeEnd("time");
// 平均在几百毫秒左右
```

DOM 层面创建 1千万个对象：

```js
console.time("time");
const arr = [];
for(let i=0;i<10000000;i++){
  arr.push(document.createElement("div"));
}
console.timeEnd("time");
// 平均在几千毫秒
```

到目前为止，我们完全了解了 JS 层面的计算和 DOM 层面的计算，速度完全不一样。

接下来我们来看一下虚拟 DOM 真实的解决的问题。

实际上无论使用虚拟 DOM 还是 innerHTML，在初始化的时候性能是相差无几的。虚拟 DOM 发挥威力的时候，实际上是在更新的时候。

来看一个例子：

```html
<body>
  <button id="updateButton">更新内容</button>
  <div id="content"></div>
  <script src="script.js"></script>
</body>
```

```js
// 通过 innerHTML 来更新 content 里面的内容
document.addEventListener("DOMContentLoaded", function () {
  const contentDiv = document.getElementById("content");
  const updateButton = document.getElementById("updateButton");

  updateButton.addEventListener("click", function () {
    const currentTime = new Date().toTimeString().split(" ")[0]; // 获取当前时间
    contentDiv.innerHTML = `
        <div class="message">
            <div class="info">
                <span>张三</span>
                <span>${currentTime}</span>
            </div>
            <p>这是一堂讲解虚拟DOM的课</p>
            <div class="btn">
                <a href="#" class="removeBtn" _id="1">删除</a>
            </div>
        </div>`;
  });
});
```

在上面的例子中，我们使用的是 innerHTML 来更新，这里涉及到的计算层面如下：

1. 销毁所有旧的 DOM（DOM 层面）
2. 解析新的字符串（JS 层面）
3. 重新创建所有 DOM 节点（DOM 层面）

如果使用虚拟 DOM，那么只有两个层面的计算：

1. 使用 diff 计算出更新的节点（JS 层面）
2. 更新必要的 DOM 节点（DOM 层面）

因此，总结一下，平时所说的虚拟DOM“快”，是有前提的：

- 首先看你和谁进行比较
  - 如果是和原生 JS 操作 DOM 进行对比，那么虚拟 DOM 性能肯定更低而非更高，因为你多了一层计算
- 其次就算你和 innerHTML 进行比较
  - 初始化渲染的时候两者之间的差距并不大
  - 虚拟 DOM 是在更新的时候相比 innerHTML 性能更高

最后总结一句话：使用虚拟 DOM 是为了防止组件在 **重渲染** 时导致的性能恶化。



接下来，关于虚拟 DOM 咱们进行一个更深层次思考，虚拟 DOM 还有哪些好处？

1. 跨平台性

虚拟 DOM 实际上是增加一层抽象层，相当于和原本的底层操作 DOM 进行解藕。这个其实就是设计原则里面的依赖倒置原则：

>高层模块不应依赖于低层模块（实际的底层操作DOM）的实现细节，两者都应依赖于抽象（虚拟DOM层）

加一层的好处在于，底层模块是可以随时替换的。使用抽象层（虚拟DOM层）来描述 UI 的结构，回头可以通过不同的渲染引擎来进行渲染，而不是局限于浏览器平台。



2. 框架更加灵活

Reactv15 升级到 Reactv16 后，架构层面有了非常大的变化，从 Stack 架构升级到了 Fiber 架构，React 内部实际上发生了翻天覆地的变化，但是对开发者的入侵是极小的，开发者基本上感受不到变化，仍然可以使用以前的开发方式进行开发。

因为 React 有虚拟 DOM 这个中间层，就将开发者的代码和框架内部的架构解藕了。架构的变化只是依赖于不同的虚拟 DOM 而已，回头开发者的代码会被编译为对应结构的虚拟 DOM.



目前有一些新的框架：Svelte、Solid.js 这一类框架提出了无虚拟 DOM 的概念。这一类框架直接将组件编译为命令式代码，而不是在运行时通过比较虚拟 DOM 来更新真实 DOM. 因此这一类框架在 **性能** 方面一定是优于虚拟 DOM 类的框架的。

包括 Vue 目前也在积极推出无虚拟 DOM 版本，简称“蒸汽模式”：https://github.com/vuejs/core-vapor

## 2.模板

- 渲染函数
- 模板编译
- 编译的时机

### 渲染函数

渲染函数（ h ）调用后会返回虚拟 DOM 节点 VNode

文档地址：https://cn.vuejs.org/api/render-function.html#h

实际上，Vue 里面的单文件组件是会被一个 **模板编译器** 进行编译的，编译后的结果并不存在什么模板template，而是会把模板编译为渲染函数的形式。

这意味着我们完全可以使用纯 JS 来书写组件，文件的内部直接调用渲染函数来描述你的组件视图。

例如我们之前写过的 UserCard 这个组件，完全可以改写成纯 JS 的形式：

```js
import { defineComponent, h } from 'vue'
import styles from './UserCard.module.css'
export default defineComponent({
  name: 'UserCard',
  props: {
    name: String,
    email: String,
    avatarUrl: String
  },
  setup(props) {
    // 下面我们使用了渲染函数的形式来描述了原本在模板中所描述的视图结构
    return () =>
      h(
        'div',
        {
          class: styles.userCard
        },
        [
          h('img', {
            class: styles.avatar,
            src: props.avatarUrl,
            alt: 'User avatar'
          }),
          h(
            'div',
            {
              class: styles.userInfo
            },
            [h('h2', props.name), h('p', props.email)]
          )
        ]
      )
  }
})
```

```css
.userCard {
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
}

.userInfo h2 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.userInfo p {
  margin: 5px 0 0;
  font-size: 16px;
  color: #666;
}
```

甚至也可以使用 Vue2 经典的 options API 的语法来写：

```js
import styles from './UserCard.module.css'
import { h } from 'vue'
export default {
  name: 'UserCard',
  props: {
    name: String,
    email: String,
    avatarUrl: String
  },
  render() {
    return h(
      'div',
      {
        class: styles.userCard
      },
      [
        h('img', {
          class: styles.avatar,
          src: this.avatarUrl,
          alt: 'User avatar'
        }),
        h(
          'div',
          {
            class: styles.userInfo
          },
          [h('h2', this.name), h('p', this.email)]
        )
      ]
    )
  }
}
```

至此我们就知道了，Vue 里面之所以提供模板的方式，是为了让开发者在描述视图的时候，更加的轻松。Vue 在运行的时候本身是不需要什么模板的，它只需要渲染函数，调用这些渲染函数后所得到的虚拟 DOM.

作为一个框架的设计者，你必须要思考：你是框架少做一些，让用户的心智负担更重一些，还是说你的框架多做一些，让用户的心智负担更少一些。

### 模板的编译

**单文件组件中所书写的模板，对于模板编译器来讲，就是普通的字符串。**

模板内容：

```vue
<template>
	<div>
  	<h1 :id="someId">Hello</h1>
  </div>
</template>
```

对于模板编译器来讲，仅仅是一串字符串：

```js
'<template><div><h1 :id="someId">Hello</h1></div></template>'
```

模板编译器需要对上面的字符串进行操作，最终生成的结果：

```js
function render(){
  return h('div', [
    h('h1', {id: someId}, 'Hello')
  ])
}
```

模板编译器在对模板字符串进行编译的时候，是一点一点转换而来的，整个过程：

![image-20231113095532166](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-11-13-015532.png)

- 解析器：负责将模板字符串解析为对应的模板AST抽象语法树
- 转换器：负责将模板AST转换为 JS AST抽象语法树
- 生成器：将 JS AST 生成最终的渲染函数

每一个部件都依赖于上一个部件的执行结果。

假设有这么一段模板：

```vue
<div>
	<p>Vue</p>
  <p>React</p>
</div>
```

对于模板编译器来讲，就是一段字符串：

```js
"<div><p>Vue</p><p>React</p></div>"
```

首先是解析器，拿到这串字符串，对这个字符串进行解析，得到一个一个的 token.

```js
[
  {"type": "tag","name": "div"},//token
  {"type": "tag","name": "p"},
  {"type": "text","content": "Vue"},
  {"type": "tagEnd","name": "p"},
  {"type": "tag","name": "p"},
  {"type": "text","content": "React"},
  {"type": "tagEnd","name": "p"},
  {"type": "tagEnd","name": "div"}
]
```

接下来解析器还需要根据所得到的 token 来生成抽象语法树（模板的AST）

转换出来的 AST：

```js
{
  "type": "Root",
  "children": [
    {
      "type": "Element",
      "tag": "div",
      "children": [
        {
          "type": "Element",
          "tag": "p",
          "children": [
              {
                "type": "Text",
                "content": "Vue"
              }
          ]
        },
        {
          "type": "Element",
          "tag": "p",
          "children": [
              {
                "type": "Text",
                "content": "React"
              }
          ]
        }
      ]
    }
  ]
}
```

至此解析器的工作就完成了。



接下来就是转换器登场，它需要将上一步得到的模板 AST 转换为 JS AST：

```js
{
  "type": "FunctionDecl",
  "id": {
      "type": "Identifier",
      "name": "render"
  },
  "params": [],
  "body": [
      {
          "type": "ReturnStatement",
          "return": {
              "type": "CallExpression",
              "callee": {"type": "Identifier", "name": "h"},
              "arguments": [
                  { "type": "StringLiteral", "value": "div"},
                  {"type": "ArrayExpression","elements": [
                        {
                            "type": "CallExpression",
                            "callee": {"type": "Identifier", "name": "h"},
                            "arguments": [
                                {"type": "StringLiteral", "value": "p"},
                                {"type": "StringLiteral", "value": "Vue"}
                            ]
                        },
                        {
                            "type": "CallExpression",
                            "callee": {"type": "Identifier", "name": "h"},
                            "arguments": [
                                {"type": "StringLiteral", "value": "p"},
                                {"type": "StringLiteral", "value": "React"}
                            ]
                        }
                    ]
                  }
              ]
          }
      }
  ]
}
```



最后就是生成器，根据上一步所得到的 JS AST，生成具体的 JS 代码：

```js
function render () {
	return h('div', [h('p', 'Vue'), h('p', 'React')])
}
```

下面是一个模板编译器大致的结构：

```js
function compile(template){
  // 1. 解析器
  const ast = parse(template)
  // 2. 转换器：将模板 AST 转换为 JS AST
  transform(ast)
  // 3. 生成器
  const code = genrate(ast)
  
  return code;
}
```



### 编译的时机

整体来讲会有两种情况：

1. 运行时编译
2. 预编译



**1. 运行时编译**

例如下面的代码，是直接通过 CDN 的方式引入的 Vue

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .user-card {
        display: flex;
        align-items: center;
        background-color: #f9f9f9;
        border: 1px solid #e0e0e0;
        border-radius: 10px;
        padding: 10px;
        margin: 10px 0;
      }
      .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 15px;
      }
      .user-info h2 {
        margin: 0;
        font-size: 20px;
        color: #333;
      }
      .user-info p {
        margin: 5px 0 0;
        font-size: 16px;
        color: #666;
      }
    </style>
  </head>
  <body>
    <!-- 书写模板 -->
    <div id="app">
      <user-card :name="name" :email="email" :avatar-url="avatarUrl" />
    </div>

    <template id="user-card-template">
      <div class="user-card">
        <img :src="avatarUrl" alt="User avatar" class="avatar" />
        <div class="user-info">
          <h2>{{ name }}</h2>
          <p>{{ email }}</p>
        </div>
      </div>
    </template>

    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
      const { createApp } = Vue;

      const UserCard = {
        name: "UserCard",
        props: {
          name: String,
          email: String,
          avatarUrl: String,
        },
        template: "#user-card-template",
      };

      createApp({
        components: {
          UserCard,
        },
        data() {
          return {
            name: "John Doe",
            email: "john@example",
            avatarUrl: "./yinshi.jpg",
          };
        },
      }).mount("#app");
    </script>
  </body>
</html>
```

在上面的例子中，也会涉及到模板代码以及模板的编译，那么此时的模板编译就是在运行时进行的。



**2. 预编译**

预编译是发生在工程化环境下面。

所谓预编译，指的是工程打包过程中就完成了模板的编译工作，浏览器拿到的是打包后的代码，是完全没有模板的。

这里推荐一个插件：vite-plugin-inspect

安装该插件后在 vite.config.js 配置文件中简单配置一下：

```js
// vite.config.js
import Inspect from 'vite-plugin-inspect'

export default {
  plugins: [
    Inspect()
  ],
}
```

之后就可以在 http://localhost:5173/__inspect/ 里面看到每一个组件编译后的结果。

## 3.组件树和虚拟DOM树

在最早期的时候，大家接触到的树就是 DOM 树：

```html
<div>
	<h1>你喜欢的水果</h1>
  <ul>
    <li>西瓜</li>
    <li>香蕉</li>
    <li>苹果</li>
  </ul>
</div>
```

上面的 HTML 结构就会形成一个 DOM 树结构：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-09-014201.png" alt="image-20240509094200993" style="zoom:50%;" />

实际上，组件的本质就是对一组 DOM 进行复用。

假设我们将上面的 DOM 结构封装成一个组件 Fruit，该组件就可以用到其他的组件里面，组件和组件之间就形成了树结构，这就是组件树。而每个组件的背后，对应的是一组虚拟 DOM，虚拟 DOM 的背后又是真实 DOM 的映射：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-09-023228.png" alt="image-20240509103228516" style="zoom:50%;" />

接下来明确定义：

- 组件树：指的是一个一个组件所形成的树结构。
- 虚拟 DOM 树：指的是某一个组件内部的虚拟 DOM 数据结构，**并非整个应用的虚拟 DOM 结构**。

理解清楚上面的概念，有助于你理解为什么 Vue 中既有响应式，又有虚拟 DOM 以及 diff 算法。

回顾 Vue1.x 以及 Vue2.x 的响应式：

- Object.defineProperty：数据拦截，getter、setter... 
- Dep：相当于观察者模式中的发布者。数据更改时发布者通知观察者执行函数。
- Watcher：相当于观察者模式中的观察者。

但是在 Vue1.x 的时候没有虚拟 DOM，模板中每次引用一个响应式数据，就会生成一个 watcher

```vue
<template>
  <div class="wrapper">
    <!-- 模版中每引用一次响应式数据，就会生成一个 watcher -->
    <!-- watcher 1 -->
    <div class="msg1">{{ msg }}</div>
    <!-- watcher 2 -->
    <div class="msg2">{{ msg }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 和 dep 一一对应，和 watcher 一 对 多
      msg: 'Hello Vue 1.0'
    }
  }
}
</script>
```

- 优点：这种设计的好处在于能够精准的知道哪个数据发生了变化。
- 缺点：当应用足够复杂的时候，一个应用里面会包含大量的组件，而这种设计又会导致一个组件对应多个 watcher，这样的设计是非常消耗资源的

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-09-030208.png" alt="image-20240509110208375" style="zoom:50%;" />

于是从 Vue2.0 版本开始，引入了虚拟 DOM。2.0 的响应式有一个非常大的变动，将 watcher 的粒度放大到了组件级别，也就是说，一个组件对应一个 watcher. 但是这种设计也会带来一些新的问题：以前能够精准的知道是哪一个节点要更新，但是现在因为 watcher 是组件级别，只能知道是哪个组件要更新，但是组件内部具体是哪一个节点更新是无从得知的。这个时候虚拟 DOM 就派上用场了，通过对虚拟 DOM 进行 diff 计算，就能够知道组件内部具体是哪一个节点更新。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-09-030710.png" alt="image-20240509110709853" style="zoom:50%;" />

Vue3 的响应式在架构层面上面是没有改变的，仍然是响应式+虚拟DOM

- 响应式：精确到组件级别，能够知道哪一个组件更新了。不过 Vue3 的响应式基于 Proxy.
- 虚拟 DOM：通过 diff 算法计算哪一个节点需要更新，不过 diff 算法也不再是 Vue2 的 diff 算法，算法方面也有更新。

## 4.数据拦截

### 数据拦截的方式

**什么是拦截？**

你想像一下你在路上开着车，从地点 A 前往地点 B. 本来能够一路畅通无阻，顺顺利利的到达地点 B，但是因为你路上不小心违反了交规，例如不小心开着远光灯一路前行，此时就会被警察拦截下来，对你进行批评教育加罚款。（满满的血泪史😢）

这就是现实生活中的拦截，**在你做一件事情的中途将你打断，从而能够做一些额外的事情**。

**数据拦截**

所谓数据拦截，无外乎就是你在对数据进行操作，例如读数据、写数据的时候

```js
const obj = {name : "张三"};
obj.name; // 正常读数据，直接就读了
obj.name = "李四"; // 正常写数据，直接就写了
obj.age = 18;
```

我们需要**一种机制，在读写操作的中途进行一个打断，从而方便做一些额外的事情**。这种机制我们就称之为数据拦截。

这种拦截打断的场景其实有很多，比如 Vue 或者 React 里面的生命周期钩子方法，这种钩子方法本质上也是一种拦截，在组件从初始化到正常渲染的时间线里，设置了几个拦截点，从而方便开发者做一些额外的事情。

**JS中的数据拦截**

接下来我们来看一下 JS 中能够实现数据拦截的方式有哪些？

目前来讲，主要的方式有两种：

1. Object.defineProperty：对应  Vue1.x、2.x 响应式
2. Proxy：对应 Vue3.x 响应式

简单复习一下这两个 API.

1. Object.defineProperty

这是 Object 上面的一个静态方法，用于**给一个对象添加新的属性**，除此之外**还能够对该属性进行更为详细的配置**。

```js
Object.defineProperty(obj, prop, descriptor)
```

- obj ：要定义属性的对象
- prop：一个字符串或 [`Symbol`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)，指定了要定义或修改的属性键。
- descriptor：属性描述符。

重点其实是在属性描述符，这个参数是一个对象，可以描述的信息有：

- value 设置属性值，默认值为 undefined.
- writable 设置属性值是否可写，默认值为 false.
- enumerable 设置属性是否可枚举，默认为 false.
- configurable 是否可以配置该属性，默认值为 false.  这里的配置主要是针对这么一些点：
  - 该属性的类型是否能在数据属性（value、writable）和访问器属性（getter、setter）之间更改
  - 该属性是否能删除
  - 描述符的其他属性是否能被更改
- get 取值函数，默认为 undefined.
- set 存值函数，默认为 undefined

数据属性：value、writable

访问器属性：getter、setter

数据属性和访问器属性默认是互斥。

也就是说，默认情况下，使用 Object.defineProperty( ) 添加的属性是不可写、不可枚举和不可配置的。

```js
function Student() {
  let stuName = "张三";
  Object.defineProperty(this, "name", {
    get() {
      return stuName;
    },
    set(value) {
      if (!isNaN(value)) {
        stuName = "张三";
      } else {
        stuName = value;
      }
    },
  });
}
const stu = new Student();
console.log(stu.name);
stu.name = "李四";
console.log(stu.name);
stu.name = 100;
console.log(stu.name);
```

2. Proxy

另外一种方式是使用 Proxy. 这是 ES6 新提供的一个 API，通过**创建代理对象的方式来实现拦截**。

```js
const p = new Proxy(target, handler)
```

- target : 目标对象，可以是任何类型的对象，包括数组，函数。
- handler: 定义代理对象的行为。
- 返回值：返回的就是一个代理对象，之后外部对属性的读写都是针对代理对象来做的

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-03-27-071734.png" alt="image-20240327151733943" style="zoom:50%;" />

```js
function Student() {
  const obj = {
    name: "张三",
  };
  return new Proxy(obj, {
    get(obj, prop) {
      return obj[prop] + "是个好学生";
    },
    set(obj, prop, value) {
      if (!isNaN(value)) {
        obj[prop] = "张三";
      } else {
        obj[prop] = value;
      }
    },
  });
}
const stu = new Student(); // stu 拿到的就是代理对象
console.log(stu.name); // 张三是个好学生
stu.name = "李四";
console.log(stu.name); // 李四是个好学生
stu.name = 100;
console.log(stu.name); // 张三是个好学生
```

### 两者共同点

**1. 都可以针对对象成员拦截**

无论使用哪一种方式，都能拦截读取操作

```js
const obj = {};
let _data = "这是一些数据";
Object.defineProperty(obj, "data", {
  get() {
    console.log("读取data的操作被拦截了");
    return _data;
  },
});
console.log(obj.data);
```

```js
const obj = {
  data: "这是一些数据",
  name: "张三"
};
const p = new Proxy(obj, {
  get(obj, prop) {
    console.log(`${prop}的读取操作被拦截了`);
    return obj[prop];
  },
});
console.log(p.data);
console.log(p.name);
```

两者都可以拦截写入操作：

```js
const obj = {};
let _data = "这是一些数据";
Object.defineProperty(obj, "data", {
  get() {
    console.log("读取data的操作被拦截了");
    return _data;
  },
  set(value){
    console.log("设置data的操作被拦截了");
    _data = value;
  }
});
obj.data = "这是新的数据";
console.log(obj.data);
```

```js
const obj = {
  data: "这是一些数据",
  name: "张三"
};
const p = new Proxy(obj, {
  get(obj, prop) {
    console.log(`${prop}的读取操作被拦截了`);
    return obj[prop];
  },
  set(obj, prop, value) {
    // 前面相当于是拦截下这个操作后，我们要做的额外的操作
    console.log(`${prop}的设置操作被拦截了`);
    // 后面就是真实的操作
    obj[prop] = value;
  }
});
p.data = "这是新的数据";
p.name = "李四";
```

**2. 都可以实现深度拦截**

两者在实现深度拦截的时候，需要自己书写递归来实现，但是总而言之是能够实现深度拦截的。

```js
const data = {
  level1: {
    level2: {
      value: 100,
    },
  },
};

function deepDefineProperty(obj) {
  for (let key in obj) {
    // 首先判断是否是自身属性以及是否为对象
    if (obj.hasOwnProperty(key) && typeof obj[key] === "object") {
      // 递归处理
      deepDefineProperty(obj[key]);
    }
    // 缓存一下属性值
    let _value = obj[key];
    Object.defineProperty(obj, key, {
      get() {
        console.log(`读取${key}属性`);
        return _value;
      },
      set(value) {
        console.log(`设置${key}属性`);
        _value = value;
      },
      configurable: true,
      enumerable: true,
    });
  }
}
deepDefineProperty(data);
console.log(data.level1.level2.value);
console.log("----------------");
data.level1.level2.value = 200;
```

```js
function deepProxy(obj) {
  return new Proxy(obj, {
    get(obj, prop) {
      console.log(`读取了${prop}属性`);
      if (typeof obj[prop] === "object") {
        // 递归的再次进行代理
        return deepProxy(obj[prop]);
      }
      return obj[prop];
    },
    set(obj, prop, value) {
      console.log(`设置了${prop}属性`);
      if (typeof value === "object") {
        return deepProxy(value);
      }
      obj[prop] = value;
    },
  });
}
const proxyData = deepProxy(data);
console.log(proxyData.level1.level2.value);
console.log("----------------");
proxyData.level1.level2.value = 200;
```

### 两者差异点

**1. 拦截的广度**

Vue3 的响应式，从原本的 Object.defineProperty 替换为了 Proxy. 

之所以替换，就是因为**两者在进行拦截的时候，无论是拦截的目标还是能够拦截的行为，都是不同的**：

- Object.defineProperty 是**针对对象特定属性**的**读写操作**进行拦截
- Proxy 则是**针对一整个对象**的**多种操作**，包括**属性的读取、赋值、属性的删除、属性描述符的获取和设置、原型的查看、函数调用等行为**能够进行拦截。

如果是使用 Object.defineProperty ，一旦后期给对象新增属性，是无法拦截到的，因为 Object.defineProperty 在设置拦截的时候是针对的特定属性，所以新增的属性无法被拦截。

但是 Proxy 就不一样，它是针对整个对象，后期哪怕新增属性也能够被拦截到。

另外，相比 Object.defineProperty，Proxy 能够拦截的行为也更多

```js
function deepProxy(obj) {
  return new Proxy(obj, {
    get(obj, prop) {
      console.log(`读取了${prop}属性`);
      if (typeof obj[prop] === "object") {
        // 递归的再次进行代理
        return deepProxy(obj[prop]);
      }
      return obj[prop];
    },
    set(obj, prop, value) {
      console.log(`设置了${prop}属性`);
      if (typeof value === "object") {
        return deepProxy(value);
      }
      obj[prop] = value;
    },
    deleteProperty(obj, prop) {
      console.log(`删除了${prop}属性`);
      delete obj[prop];
    },
    getPrototypeOf(obj) {
      console.log("拦截获取原型");
      return Object.getPrototypeOf(obj);
    },
    setPrototypeOf(obj, proto) {
      console.log("拦截设置原型");
      return Object.setPrototypeOf(obj, proto);
    },
  });
}
```

理解了上面的差异点之后，你就能够完全理解 Vue2 的响应式会有什么样的缺陷：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-17-025746.png" alt="image-20240517105745592" style="zoom:50%;" />



**2. 性能上的区别**

接下来是性能方面的区别，究竟哪种方式的性能更高呢？

**大多数情况下，Proxy 是高效的**，但是不能完全断定 Proxy 就一定比 Object.defineProperty 效率高，因为这还是得看具体的场景。

如果你**需要拦截的操作类型较少，且主要集中在某些特定属性上，那么 Object.defineProperty 可能提供更好的性能**。

- 但是只针对某个特定属性的拦截场景较少，一般都是需要针对一个对象的所有属性进行拦截
- 此时如果需要拦截的对象结构复杂（如需要递归到嵌套对象）或者需要拦截的操作种类繁多，那么使用这种方式就会变得复杂且效率低下。

如果你需要全面地拦截对象的各种操作，那么 Proxy 能提供更强大和灵活的拦截能力，尽管可能有一些轻微的性能开销。

## 5.响应式数据

什么是响应式数据？其实就是**被拦截的对象**。

当对象被拦截后，针对对象的各种操作也就能够被拦截下来，从而让我们有机会做一些额外的事情。因此只要是被拦截了对象，就可以看作是一个响应式数据。

在 Vue3 中，创建响应式数据的方式，有 **ref** 和 **reactive** 两种，**这两个 API 的背后，就是就是针对对象添加拦截**。

在 JS 中，要实现数据拦截，要么是 Object.defineProperty，要么是 Proxy，而这两者都是针对**对象**来进行操作的。

ref 以及 reactive 源码：

```js
class RefImpl<T> {
  private _value: T
  private _rawValue: T

  public dep?: Dep = undefined
  public readonly __v_isRef = true

  constructor(
    value: T,
    public readonly __v_isShallow: boolean,
  ) {
    this._rawValue = __v_isShallow ? value : toRaw(value)
    // 有可能是原始值，有可能是 reactive 返回的 proxy
    this._value = __v_isShallow ? value : toReactive(value)
  }

  get value() {
    // 收集依赖 略
    return this._value
  }

  set value(newVal) {
    // 略
  } 
}

// 判断是否是对象，是对象就用 reactive 来处理，否则返回原始值
export const toReactive = <T extends unknown>(value: T): T =>
  isObject(value) ? reactive(value) : value

// 回忆 ref 的用法
const state = ref(5);
state.value;
```

```js
function createReactiveObject(
  target: Target,
  isReadonly: boolean,
  baseHandlers: ProxyHandler<any>,
  collectionHandlers: ProxyHandler<any>,
  proxyMap: WeakMap<Target, any>,
) {
  // ...
    
  // 创建 Proxy 代理对象
  const proxy = new Proxy(
    target,
    targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers,
  )
  proxyMap.set(target, proxy)
  return proxy
}

export function reactive(target: object) {
  // ...
  
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap,
  )
}
```

从源码中我们就可以看出，**ref 和 reactive 在实现响应式上面的策略是有所不同**：

- ref：使用 Object.defineProperty + Proxy 方式
- reactive：使用 Proxy 方式

这节课还有一个非常重要的知识点，就是要 **学会判断某个操作是否会产生拦截**。因为只有产生拦截，才会有后续的依赖收集和派发更新一类的操作。

简单复习上节课的知识，有两个 API 能够实现拦截：

1. Object.defineProperty
   - 特定的属性的读取
   - 特定的属性的赋值
2. 操作 Proxy 代理对象的成员
   - 读取
   - 赋值
   - 新增
   - 删除

测试题目：

```js
// demo1
let state = ref(1);
state; // 不会拦截
console.log(state); // 不会拦截
console.log(state.value); // 会拦截，因为访问了 value 属性
console.log(state.a); // 不会拦截
state.a = 3; // 不会拦截
state.value = 3; // 会拦截
delete state.value; // 不会拦截
state = 3; // 不会拦截
```

```js
// demo2
let state = ref({ a: 1 });
state; // 不会拦截
console.log(state); // 不会拦截
console.log(state.value); // 会拦截
console.log(state.a); // 不会拦截
console.log(state.value.a); // 会拦截，拦截到 value 和 a 属性的 get 操作
state.a = 3; // 不会拦截
state.value.a = 3; // 会拦截，value 的 get 操作，a 属性的 set 操作
delete state.value.a; // 会拦截，value 的 get 操作，a 属性的 delete 操作
state.value = 3; // 会拦截，value 的 set 操作
delete state.value; // 不会拦截
state = 3; // 不会拦截
```

```js
// demo3
let state = reactive({});
state; // 不会拦截
console.log(state); // 不会拦截
console.log(state.a); // 会拦截
state.a = 3; // 会拦截
state.a = {
  b: {
    c: 3,
  },
}; // 会拦截，拦截到 a 属性的 set 操作
console.log("-------------");
console.log(state.a.b.c); // 会拦截
delete state.a.b; // 会拦截 a 是 get 操作，b 是 delete 操作
```

```js
// demo4
const state = ref({ a: 1 });
const k = state.value; 
console.log("-------------");
console.log(k); // 不会拦截，k 相当于是一个 proxy 对象，没有针对成员进行操作
k.a = 3; // 会拦截，因为 k 是一个 proxy 对象，对 k 的成员进行操作会触发代理的 set 操作
const n = k.a; // 会拦截，因为访问了 k 的成员 a，会触发代理的 get 操作
console.log("-------------");
console.log(n); 
```

```js
// demo5
const arr = reactive([1, 2, 3]);
arr; // 不会拦截
arr.length; // 会拦截
arr[0]; // 会拦截，拦截 0 的 get 操作
arr[0] = 3; // 会拦截，拦截 0 的 set 操作
arr.push(4); // 会被拦截
```

再次强调，**一定要学会去判断针对一个对象进行操作的时候，是否会发生拦截，这一点非常重要**‼️

## 6.响应式

- 依赖收集：所谓依赖收集，其实就是收集的一些函数。因为当数据发生变化的时候，需要重新执行这些函数，因此需要提前收集起来。
- 派发更新：所谓派发更新，就是通知被收集了的函数，现在数据已经更新了，你们需要重新执行一遍。

**数据**

当数据发生变换会通知一些函数重新执行，这里的数据指的就是**响应式数据**。

在 Vue 里面，那就是指：

- **ref**
- **reactive**
- **props**
- **computed**

这几种方式所得到的数据就是响应式数据。

**依赖**

谁和谁之间有依赖关系？

**响应式数据**和**函数**之间有依赖关系。**当函数在运行期间用到了响应式数据，那么我们可以称之为两者之间有依赖**。

但还有一点需要明确，那就是什么是用到？

**所谓用到，是指函数在运行期间出现了读取成员被拦截的情况，这样才算是用到**。

完整表述：**函数在运行期间，出现了读取响应式数据被拦截的情况，我们就称之为两者之间产生了依赖，这个依赖（也就是一个对应关系）是会被收集的，方便响应式数据发生变化时重新执行对应的函数**。

练习：

```js
// demo1
var a;
function foo() {
  console.log(a);
}
// 没有依赖关系，a 不是响应式数据
```

```js
// demo2
var a = ref(1);
function foo() {
  console.log(a);
}
// 没有依赖关系，虽然用到了响应式数据，但是没有出现读取拦截的情况
```

```js
// demo3
var a = ref(1);
function foo() {
  console.log(a.value);
}
// 有依赖关系，foo 依赖 value 属性
```

```js
// demo4
var a = ref({ b: 1 });
const k = a.value;
const n = k.b;
function foo() {
  a;
  a.value;
  k.b;
  n;
}
// 有依赖关系
// foo 依赖 a 的 value 属性
// foo 依赖 k 的 b 属性
```

```js
// demo5
var a = ref({ b: 1 });
const k = a.value;
const n = k.b;
function foo() {
  a;
  k.b;
  n;
}
// 有依赖关系
// foo 依赖 k 的 b 属性
```

```js
// demo6
var a = ref({ b: 1 });
const k = a.value;
const n = k.b;
function foo() {
  a;
  a.value.b
  n;
}
// 有依赖关系
// foo 依赖 a 的 value 以及 b 属性
```

```js
// demo7
var a = ref({ b: 1 });
const k = a.value;
const n = k.b;
function foo() {
  function fn2(){
    a;
    a.value.b
    n;
  }
  fn2();
}
// 有依赖关系
// foo 依赖 a 的 value 以及 b 属性
```

总而言之：**只需要判断在函数的运行期间，是否存在读取操作行为的拦截，只要存在这种类型的拦截，那么该函数就和该响应式数据存在依赖关系**。

不过，有一种情况需要注意，那就是**异步**。**如果在函数的运行期间存在异步代码，那么之后的代码统统不看了**。

```js
// demo8
var a = ref({ b: 1 });
const k = a.value;
const n = k.b;
async function foo() {
  a;
  a.value; // 产生依赖，依赖 value 属性
  await 1;
  k.b; // 没有依赖，因为它是异步后面的代码
  n;
}
```



**函数**

**函数必须是被监控的函数**。

- **effect**：这是 Vue3 源码内部的底层实现，后期会介绍
- **watchEffect**
- **watch**
- **组件渲染函数**

因此最后总结一下：**<u>只有被监控的函数，在它的同步代码运行期间，读取操作被拦截的响应式数据，才会建立依赖关系，建立了依赖关系之后，响应式数据发生变化，对应的函数才会重新执行</u>**。

练习：

```js
// demo1
import { ref, watchEffect } from "vue";
const state = ref({ a: 1 });
const k = state.value;
const n = k.a;
watchEffect(() => {
  // 首先判断依赖关系
  console.log("运行");
  state; // 没有依赖关系产生
  state.value; // 会产生依赖关系，依赖 value 属性
  state.value.a; // 会产生依赖关系，依赖 value 和 a 属性
  n; // 没有依赖关系
});
setTimeout(() => {
  state.value = { a: 3 }; // 要重新运行
}, 500);

```

```js
// demo2
import { ref, watchEffect } from "vue";
const state = ref({ a: 1 });
const k = state.value;
const n = k.a;
watchEffect(() => {
  console.log("运行");
  state;
  state.value; // value
  state.value.a; // value a
  n;
});
setTimeout(() => {
  //   state.value; // 不会重新运行
  state.value.a = 1; // 不会重新运行
}, 500);
```

```js
// demo3
import { ref, watchEffect } from "vue";
const state = ref({ a: 1 });
const k = state.value;
const n = k.a;
watchEffect(() => {
  console.log("运行");
  state;
  state.value; // value
  state.value.a; // value、a
  n;
});
setTimeout(() => {
  k.a = 2; // 这里相当于是操作了 proxy 对象的成员 a
  // 要重新运行
  // 如果将上面的 state.value.a; 这句话注释点，就不会重新运行
}, 500);
```

```js
// demo4
import { ref, watchEffect } from "vue";
const state = ref({ a: 1 });
const k = state.value;
let n = k.a;
watchEffect(() => {
  console.log("运行");
  state;
  state.value;
  state.value.a;
  n;
});
setTimeout(() => {
  n++; // 不会重新运行
}, 500);
```

```js
// demo5
import { ref, watchEffect } from "vue";
const state = ref({ a: 1 });
const k = state.value;
let n = k.a;
watchEffect(() => {
  console.log("运行");
  state;
  state.value;
  state.value.a;
  n;
});
setTimeout(() => {
  state.value.a = 100; // 要重新运行
}, 500);
```

```js
// demo6
import { ref, watchEffect } from "vue";
let state = ref({ a: 1 });
const k = state.value;
let n = k.a;
watchEffect(() => {
  console.log("运行");
  state;
  state.value;
  state.value.a;
  n;
});
setTimeout(() => {
  state = 100; // 不要重新运行
}, 500);
```

```js
// demo7
import { ref, watchEffect } from "vue";
const state = ref({ a: 1 });
const k = state.value;
const n = k.a;
watchEffect(() => {
  console.log("运行");
  state;
  state.value; // value 会被收集
  n;
});
setTimeout(() => {
  state.value.a = 100; // 不会重新执行
}, 500);
```

```js
// demo8
import { ref, watchEffect } from "vue";
let state = ref({ a: 1 });
const k = state.value;
const n = k.a;
watchEffect(() => {
  console.log("运行");
  state.value.a; // value、a
});
setTimeout(() => {
  state.value = { a: 1 }; // 要重新运行
}, 500);
```

```js
// demo9
import { ref, watchEffect } from "vue";
const state = ref({ a: 1 });
const k = state.value;
const n = k.a;
watchEffect(() => {
  console.log("运行");
  state.value.a = 2; // 注意这里的依赖仅仅只有 value 属性
});
setTimeout(() => {
  //   state.value.a = 100; // 不会重新运行的
  state.value = {}; // 要重新运行
}, 500);
```

```js
// demo10
import { ref, watchEffect } from "vue";
let state = ref({ a: 1 });
const k = state.value;
const n = k.a;
watchEffect(() => {
  console.log("运行");
  state;
  state.value.a; // value、a
  n;
});
setTimeout(() => {
  state.value.a = 2; // 要重新运行
}, 500);
setTimeout(() => {
  //   k.a = 3; // 要重新运行
  k.a = 2; // 因为值没有改变，所以不会重新运行
}, 1000);
```

```js
// demo11
import { ref, watchEffect } from "vue";
let state = ref({ a: 1 });
const k = state.value;
const n = k.a;
watchEffect(() => {
  console.log("运行");
  state.value.a; // value、a
});
setTimeout(() => {
  state.value = { a: 1 }; // 要重新运行
}, 500);
setTimeout(() => {
  k.a = 3; // 这里不会重新运行，因为前面修改了 state.value，不再是同一个代理对象
}, 1000);
```

```js
// demo12
import { ref, watchEffect } from "vue";
let state = ref({ a: 1 });
const k = state.value;
const n = k.a;
watchEffect(() => {
  console.log("运行");
  state.value.a; // value、a
});
setTimeout(() => {
  state.value = { a: 1 }; // 要重新执行
}, 500);
setTimeout(() => {
  state.value.a = 2; // 要重新执行
}, 1000);
```

```js
// demo13
import { ref, watchEffect } from "vue";
let state = ref({ a: 1 });
const k = state.value;
const n = k.a;
watchEffect(() => {
  console.log("运行");
  state.value.a; // value、a
});
setTimeout(() => {
  state.value = { a: 1 }; // 重新执行
}, 500);
setTimeout(() => {
  state.value.a = 1; // 不会重新执行，因为值没有变化
}, 1500);

```

```js
// demo14
import { ref, watchEffect } from "vue";
let state = ref({ a: 1 });
const k = state.value;
const n = k.a;
watchEffect(() => {
  console.log("运行");
  state.value.a; // value、a
  k.a; // 返回的 proxy 对象的 a 成员
});
setTimeout(() => {
  state.value = { a: 1 }; // 要重新运行
}, 500);
setTimeout(() => {
  k.a = 3; // 会重新执行
}, 1000);
setTimeout(() => {
  state.value.a = 4; // 会重新执行
}, 1500);
```

在这节课的最后，我们再对响应式的本质做一个完整的总结：

**<u>所谓响应式，背后其实就是函数和数据的一组映射，当数据发生变化，会将该数据对应的所有函数全部执行一遍。当然这里的数据和函数都是有要求的。数据是响应式数据，函数是被监控的函数。</u>**

**<u>收集数据和函数的映射关系在 Vue 中被称之为依赖收集，数据变化通知映射的函数重新执行被称之为派发更新。</u>**

什么时候会产生依赖收集？

**<u>只有被监控的函数，在它的同步代码运行期间，读取操作被拦截的响应式数据，才会建立依赖关系，建立了依赖关系之后，响应式数据发生变化，对应的函数才会重新执行</u>**。

## 7.响应式与组件渲染

回顾一下之前讲的内容：

- 模板的本质：对应的就是 render 渲染**函数**，该函数执行之后，会返回虚拟 DOM，这是一种用来描述真实 DOM 的数据结构。
- 响应式的本质：当数据发生变化的时候，依赖该数据的**函数**重新运行。

假设 render 函数运行期间用到了响应式数据会怎么样？

结果很简单，那就是这个 render 函数会和响应式数据关联起来，当响应式数据发生变化的时候，所关联的 render 函数会重新运行，从而得到新的虚拟 DOM 结构，然后渲染器会根据新的虚拟 DOM 结构去更新真实 DOM 结构，从而在视觉感官上看到的是界面的变化。

>这里说是重新运行 render，其实都还不是最准确的表达，实际上源码内部是和 updateComponent 方法进行的关联，而该方法的内部调用了 render 函数。

**再看模板编译**

App.vue

```vue
<template>
  <div>{{ name }}</div>
  <div>{{ age }}</div>
</template>

<script setup>
import { ref } from 'vue'
let name = ref('Bill')
let age = ref(18)
</script>
```

在上面的代码中，模板用到了两个响应式数据，在模板中使用 ref 是会自动解包 value 的，因此这里就相当于在读取 vlaue 值，读取 value 就会产生读取的拦截，然后这两个响应式数据就会被模板背后所对应的渲染函数关联起来，有了依赖关系。

有了依赖关系之后，响应式数据的变化就会导致渲染函数（被监控的函数）重新执行，得到新的虚拟 DOM，从而 UI 得到更新。

下面是通过 vite-plugin-inspect 插件进行编译分析，从而验证上面的说法：

![image-20240524095001844](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-24-015001.png)

在 setup 函数中定义了响应式数据，会转变成一个 \__returned__ 的一个对象的访问器属性，针对这两个属性进行读取和赋值的时候，就会被拦截到。

在 \_sfc_render 渲染函数中，setup 所返回的对象通过 $setup 参数可以拿到，在渲染函数中，通过 $setup.name 和 $setup.age 访问这两个访问器属性，产生读取行为的拦截，从而建立了依赖关系。



**为什么Vue能实现精准更新**

**Vue 的更新是组件级别的**，通过响应式，能够知道具体是哪个组件更新了。

因为响应式数据是和 render 函数关联在一起，整个 render 函数对应的就是一整个组件的结构，回头只要响应式数据一变化，render 函数就会重新执行，生成组件新的虚拟 DOM 结构。

之后要知道具体是哪一个节点更新，就需要靠 diff 算法了。

- Vue2: 双端 diff
- Vue3: 快速 diff



**为什么Vue能实现数据共享**

在 Vue 中是可以轻松实现数据共享的。**只需要将响应式数据单独提取出来，然后多个组件依赖这个响应式数据，之后只要这个响应式数据一变，依赖该数据的组件自然也会重新运行 render，然后渲染器渲染新的 DOM**.

来看一个例子：

```js
import { reactive } from 'vue'

export const store = reactive({
  todos: [
    {
      id: 1,
      text: '学习Vue3',
      completed: false
    },
    {
      id: 2,
      text: '学习React',
      completed: false
    },
    {
      id: 3,
      text: '学习Angular',
      completed: false
    }
  ],
  addTodo(todo) {
    this.todos.push(todo)
  },
  toggleTodo(id) {
    const todo = this.todos.find((todo) => todo.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }
})
```

> 完整的 demo 代码请参阅本节课的配套的课件。

那 Pinia 的作用呢？

Pinia 是经过了完善的测试的，会给你带来很多附加的价值，例如：

- 开发工具支持
- 热替换
- 插件机制
- 自动补全
- SSR

而且相比一个单纯的响应式数据，Pinia <u>语义</u>上面也会更好一些：

- 一个单独抽出来的 reactive 对象，从语义上来讲可能是任何东西
- 一个 Pinia 对象，从语义上来讲就是全局共享数据的仓库

这样其实也能一定程度的降低开发者的心智负担，提高代码的可读性。

## 7.1 实现响应式系统1

> 笔记记录重要内容。

**核心要素**

要实现一个响应式系统，最为核心的有两个部分：

1. 监听数据的读写
2. 关联数据和函数

只要把这两个部分完成了，那么整个响应式系统也就基本成型了。



**监听数据读写**

- 数据：在 JS 中，能够拦截读写的方式，要么 Object.defineProperty，要么就是 Proxy，这两个方法针对的目标是对象，因此我们这里考虑对对象类型进行监听
- 读写：虽然说是监听读写，但是细分下来要监听的行为如下：
  - 获取属性：读取 GET
  - 设置属性：写入 SET
  - 新增属性：写入 ADD
  - 删除属性：写入 DELETE
  - 是否存在某个属性：读取 HAS
  - 遍历属性：读取 ITERATE



**拦截后对应的处理**

不同的行为，拦截下来后要做的事情是不一样的。整体来讲分为两大类：

- 收集器：针对读取的行为，会触发收集器去收集依赖，所谓收集依赖，其实就是建立数据和函数之间的依赖关系
- 触发器：针对写入行为，触发器会工作，触发器所做的事情就是触发数据所关联的所有函数，让这些函数重新执行

下面是不同行为对应的事情：

- 获取属性：收集器
- 设置属性：触发器
- 新增属性：触发器
- 删除属性：触发器
- 是否存在某个属性：收集器
- 遍历属性：收集器

总结起来也很简单，**只要涉及到属性的访问，那就是收集器，只要涉及到属性的设置（新增、删除都算设置），那就是触发器**。

## 7.2 实现响应式系统2

**数组中查找对象**

因为在进行代理的时候，是进行了递归代理的，也就是说对象里面成员包含对象的话，也会被代理，这就会导致数组中成员有对象的话，是找不到的。原因很简答，比较的是原始对象和代理对象，自然就找不到。

解决方案：先正常找，找不到就在原始对象中重新找一遍



**数组改动长度**

关于数组长度的改变，也会有一些问题，如果是隐式的改变长度，不会触发 length 的拦截。

另外即便是显式的设置 length，这里会涉及到新增和删除，新增情况下的拦截是正常的，但是在删除的情况下，不会触发 DELETE 拦截，因此也需要手动处理。



**自定义是否要收集依赖**

当调用 push、pop、shift 等方法的时候，因为涉及到了 length 属性的变化，会触发依赖收集，这是我们不期望的。

最好的方式，就是由我们来控制是否要依赖收集。

## 7.3 图解EFFECT

effect 方法的作用：就是将 **函数** 和 **数据** 关联起来。

回忆 watchEffect

```js
import { ref, watchEffect } from "vue";
const state = ref({ a: 1 });
const k = state.value;
const n = k.a;
// 这里就会整理出 state.value、state.value.a
watchEffect(() => {
  console.log("运行");
  state;
  state.value;
  state.value.a;
  n;
});
setTimeout(() => {
  state.value = { a: 3 }; // 要重新运行，因为是对 value 的写入操作
}, 500);
```



effect函数的设计：

```js
// 原始对象
const data = {
  a: 1,
  b: 2,
  c: 3,
};
// 产生一个代理对象
const state = new Proxy(data, { ... });
effect(() => {
  console.log(state.a);
});
```

在上面的代码中，向 effect 方法传入的回调函数中，访问了 state 的 a 成员，然后我们期望 a 这个成员和这个回调函数建立关联。

第一版实现如下：

```js
let activeEffect = null; // 记录当前的函数
const depsMap = new Map(); // 保存依赖关系

function track(target, key) {
  // 建立依赖关系
  if (activeEffect) {
    let deps = depsMap.get(key); // 根据属性值去拿依赖的函数集合
    if (!deps) {
      deps = new Set(); // 创建一个新的集合
      depsMap.set(key, deps); // 将集合存入 depsMap
    }
    // 将依赖的函数添加到集合里面
    deps.add(activeEffect);
  }
  console.log(depsMap);
}

function trigger(target, key) {
  // 这里面就需要运行依赖的函数
  const deps = depsMap.get(key);
  if (deps) {
    deps.forEach((effect) => effect());
  }
}

// 原始对象
const data = {
  a: 1,
  b: 2,
  c: 3,
};
// 代理对象
const state = new Proxy(data, {
  get(target, key) {
    track(target, key); // 进行依赖收集
    return target[key];
  },
  set(target, key, value) {
    target[key] = value;
    trigger(target, key); // 派发更新
    return true;
  },
});

/**
 *
 * @param {*} fn 回调函数
 */
function effect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}

effect(() => {
  // 这里在访问 a 成员时，会触发 get 方法，进行依赖收集
  console.log('执行函数')
  console.log(state.a);
});
state.a = 10;
```

第一版实现，**每个属性对应一个 Set 集合**，该集合里面是所依赖的函数，所有属性与其对应的依赖函数集合形成一个 map 结构，如下图所示：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-30-005612.png" alt="image-20240530085612443" style="zoom:50%;" />

activeEffect 起到一个中间变量的作用，临时存储这个回调函数，等依赖收集完成后，再将这个临时变量设置为空即可。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-30-010642.png" alt="image-20240530090641942" style="zoom:50%;" />

**问题一**：每一次运行回调函数的时候，都应该确定新的依赖关系。

稍作修改：

```js
effect(() => {
  if (state.a === 1) {
    state.b;
  } else {
    state.c;
  }
  console.log("执行了函数");
});
```

在上面的代码中，两次运行回调函数，所建立的依赖关系应该是不一样的：

- 第一次：a、b
- 第二次：a、c

第一次运行依赖如下：

```js
Map(1) { 'a' => Set(1) { [Function (anonymous)] } }
Map(2) {
  'a' => Set(1) { [Function (anonymous)] },
  'b' => Set(1) { [Function (anonymous)] }
}
执行了函数
```

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-30-011134.png" alt="image-20240530091134221" style="zoom:50%;" />

执行 state.a = 100

依赖关系变为了：

```js
Map(1) { 'a' => Set(1) { [Function (anonymous)] } }
Map(2) {
  'a' => Set(1) { [Function (anonymous)] },
  'b' => Set(1) { [Function (anonymous)] }
}
执行了函数
Map(2) {
  'a' => Set(1) { [Function (anonymous)] },
  'b' => Set(1) { [Function (anonymous)] }
}
Map(2) {
  'a' => Set(1) { [Function (anonymous)] },
  'b' => Set(1) { [Function (anonymous)] }
}
执行了函数
```

当 a 的值修改为 100 后，依赖关系应该重新建立，也就是说：

- 第一次运行：建立 a、b 依赖
- 第二次运行：建立 a、c 依赖

那么现在 a 的值明明已经变成 100 了，为什么重新执行回调函数的时候，没有重新建立依赖呢？

原因也很简单，如下图所示：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-30-012138.png" alt="image-20240530092137893" style="zoom:50%;" />

**第一次建立依赖关系的时候，是将依赖函数赋值给 activeEffect，最终是通过 activeEffect 这个中间变量将依赖函数添加进依赖列表的**。依赖函数执行完毕后，activeEffect 就设置为了 null，之后 a 成员的值发生改变，重新运行的是回调函数，但是 activeEffect 的值依然是 null，这就会导致 track 中依赖收集的代码根本进不去：

```js
function track(target, key) {
  if (activeEffect) {
    // ...
  }
}
```

怎么办呢？也很简单，**我们在收集依赖的时候，不再是仅仅收集回调函数，而是收集一个包含 activeEffect 的环境**，继续改造 effect：

```js
function effect(fn) {
  const environment = () => {
    activeEffect = environment;
    fn();
    activeEffect = null;
  };
  environment();
}
```

这里 activeEffect 对应的值，不再是像之前那样是回调函数，而是一整个 environment 包含环境信息的函数，这样当重新执行依赖的函数的时候，执行的也就是这个环境函数，而环境函数的第一行就是 activeEffect 赋值，这样就能够正常的进入到依赖收集环节。

如下图所示：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-30-012752.png" alt="image-20240530092751730" style="zoom:50%;" />

**问题二：**旧的依赖没有删除

解决方案：在执行 fn 方法之前，先调用了一个名为 cleanup 的方法，该方法的作用就是用来清除依赖。

该方法代码如下：

```js
function cleanup(environment) {
  let deps = environment.deps; // 拿到当前环境函数的依赖（是个数组）
  if (deps.length) {
    deps.forEach((dep) => {
      dep.delete(environment);
      if (dep.size === 0) {
        for (let [key, value] of depsMap) {
          if (value === dep) {
            depsMap.delete(key);
          }
        }
      }
    });
    deps.length = 0;
  }
}
```

具体结构如下图所示：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-30-014306.png" alt="image-20240530094306251" style="zoom:50%;" />



**测试多个依赖函数**

```js
effect(() => {
  if (state.a === 1) {
    state.b;
  } else {
    state.c;
  }
  console.log("执行了函数1");
});
effect(() => {
  console.log(state.c);
  console.log("执行了函数2");
});
state.a = 2;
```

```js
effect(() => {
  if (state.a === 1) {
    state.b;
  } else {
    state.c;
  }
  console.log("执行了函数1");
});
effect(() => {
  console.log(state.a);
  console.log(state.c);
  console.log("执行了函数2");
});
state.a = 2;
```

解决无限循环问题：

在 track 函数中，每次 state.a 被访问时，都会重新添加当前的 activeEffect 到依赖集合中。而在 trigger 函数中，当 state.a 被修改时，会触发所有依赖 state.a 的 effect 函数，这些 effect 函数中又会重新访问 state.a，从而导致了无限循环。具体来讲：

1. 初始执行 effect 时，state.a 的值为 1，因此第一个 effect 会访问 state.b，第二个 effect 会访问 state.a 和 state.c。 
2. state.a 被修改为 2 时，trigger 函数会触发所有依赖 state.a 的 effect 函数。 
3. 第二个 effect 函数被触发后，会访问 state.a，这时 track 函数又会把当前的 activeEffect 添加到 state.a 的依赖集合中。 
4. 因为 state.a 的值被修改，会再次触发 trigger，导致第二个 effect 函数再次执行，如此循环往复，导致无限循环。

要解决这个问题，可以在 trigger 函数中添加一些机制来防止重复触发同一个 effect 函数，比如使用一个 Set 来记录已经触发过的 effect 函数：

```js
function trigger(target, key) {
  const deps = depsMap.get(key);
  if (deps) {
    const effectsToRun = new Set(deps); // 复制一份集合，防止在执行过程中修改原集合
    effectsToRun.forEach((effect) => effect());
  }
}
```



**测试嵌套函数**

```js
effect(() => {
  effect(() => {
    state.a
    console.log("执行了函数2");
  });
  state.b;
  console.log("执行了函数1");
});
```

会发现所建立的依赖又不正常了：

```js
Map(1) { 'a' => Set(1) { [Function: environment] { deps: [Array] } } }
执行了函数2
Map(1) { 'a' => Set(1) { [Function: environment] { deps: [Array] } } }
执行了函数1
```

究其原因，是目前的函数栈有问题，当执行到内部的 effect 函数时，会将 activeEffect 设置为 null，如下图所示：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-30-023612.png" alt="image-20240530103611905" style="zoom:50%;" />

解决方案：模拟函数栈的形式。

## 7.4 实现响应式系统3-关联数据和函数

**依赖收集**

![image-20240529131604509](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-29-051604.png)



**实现Effect**

这里直接给出 Effect 实现：

```js
/**
 * 用于记录当前活动的 effect
 */
export let activeEffect = undefined;
export const targetMap = new WeakMap(); // 用来存储对象和其属性的依赖关系
const effectStack = [];

/**
 * 该函数的作用，是执行传入的函数，并且在执行的过程中，收集依赖
 * @param {*} fn 要执行的函数
 */
export function effect(fn) {
  const environment = () => {
    try {
      activeEffect = environment;
      effectStack.push(environment);
      cleanup(environment);
      return fn();
    } finally {
      effectStack.pop();
      activeEffect = effectStack[effectStack.length - 1];
    }
  };
  environment.deps = [];
  environment();
}

export function cleanup(environment) {
  let deps = environment.deps; // 拿到当前环境函数的依赖（是个数组）
  if (deps.length) {
    deps.forEach((dep) => {
      dep.delete(environment);
    });
    deps.length = 0;
  }
}
```



**改造track**

之前 track 仅仅只是简单的打印，那么现在就不能是简单打印了，而是进行具体的依赖收集。

注意依赖收集的时候，需要按照上面的设计一层一层进行查找。



**改造trigger**

trigger 要做的事情也很简单，就是从我们所设计的数据结构里面，一层一层去找，找到对应的依赖函数集合，然后全部执行一次。

首先我们需要**建立一个设置行为和读取行为之间的映射关系**：

```js
// 定义修改数据和触发数据的映射关系
const triggerTypeMap = {
  [TriggerOpTypes.SET]: [TrackOpTypes.GET],
  [TriggerOpTypes.ADD]: [
    TrackOpTypes.GET,
    TrackOpTypes.ITERATE,
    TrackOpTypes.HAS,
  ],
  [TriggerOpTypes.DELETE]: [
    TrackOpTypes.GET,
    TrackOpTypes.ITERATE,
    TrackOpTypes.HAS,
  ],
};
```

我们前面在建立映射关系的时候，是根据具体的获取信息的行为来建立的映射关系，那么我们获取信息的行为有：

- GET
- HAS
- ITERATE

这些都是在获取成员信息，而依赖函数就是和这些获取信息的行为进行映射的。

因此在进行设置操作的时候，需要思考一下当前的设置，会涉及到哪些获取成员的行为，然后才能找出该行为所对应的依赖函数。



**懒执行**

有些时候我们想要实现懒执行，也就是不想要传入 effect 的回调函数自动就执行一次，通过配置项来实现



**添加回调**

有些时候需要由用户来指定是否派发更新，支持用户传入一个回调函数，然后将要依赖的函数作为参数传递回给用户给的回调函数，由用户来决定如何处理。

## 8.computed

**回顾computed的用法**

首先回顾一下 computed 的基本用法：

```js
const state = reactive({
  a: 1,
  b: 2
})

const sum = computed(() => {
  return state.a + state.b
})
```

```js
const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  get() {
    return firstName.value + ' ' + lastName.value
  },
  set(newValue) {
    ;[firstName.value, lastName.value] = newValue.split(' ')
  }
})
```



**实现computed方法**

首先第一步，我们需要对参数进行归一化，如下所示：

```js
function normalizeParameter(getterOrOptions) {
  let getter, setter;
  if (typeof getterOrOptions === "function") {
    getter = getterOrOptions;
    setter = () => {
      console.warn(`Computed property was assigned to but it has no setter.`);
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  return { getter, setter };
}
```

上面的方法就是对传入 computed 的参数进行归一化，无论是传递的函数还是对象，统一都转换为对象。



接下啦就是建立依赖关系，如何建立呢？

无外乎就是将传入的 getter 函数运行一遍，getter 函数内部的响应式数据和 getter 产生关联：

```js
// value 用于记录计算属性的值，dirty 用于标识是否需要重新计算
let value,
  dirty = true;
// 将 getter 传入 effect，getter 里面的响应式属性就会和 getter 建立依赖关系
const effetcFn = effect(getter, {
  lazy: true,
});
```

这里的 value 用于缓存计算的值，dirty 用于标记数据是否过期，一开始标记为过期方便一开始执行一次计算到最新的值。

lazy 选项标记为 true，因为计算属性只有在访问的之后，才会进行计算。



接下来向外部返回一个对象：

```js
const obj = {
  // 外部获取计算属性的值
  get value() {
    if (dirty) {
      // 第一次会进来，先计算一次，然后将至缓存起来
      value = effetcFn();
      dirty = false;
    }
    // 返回计算出来的值
    return value;
  },
  set value(newValue) {
    setter(newValue);
  },
};
return obj;
```

该对象有一个 value 访问器属性，当访问 value 值的时候，会根据当前是否为脏值来决定是否重新计算。



目前为止，我们的计算属性工作一切正常，但是这种情况，某一个函数依赖计算属性的值，例如渲染函数。那么此时计算属性值的变化，应该也会让渲染函数重新执行才对。例如：

```js
const state = reactive({
  a: 1,
  b: 2,
});
const sum = computed(() => {
  console.log("computed");
  return state.a + state.b;
});

effect(() => {
  // 假设这个是渲染函数，依赖了 sum 这个计算属性
  console.log("render", sum.value);
});

state.a++
```

执行结果如下：

```js
computed
render 3
computed
```

可以看到 computed 倒是重新执行了，但是渲染函数并没有重新执行。

怎么办呢？很简单，内部让渲染函数和计算属性的值建立依赖关系即可。

```js
const obj = {
  // 外部获取计算属性的值
  get value() {
    // 相当于计算属性的 value 值和渲染函数之间建立了联系
    track(obj, TrackOpTypes.GET, "value");
    // ...
  },
 	// ...
};
return obj;
```

首先在获取依赖属性的值的时候，我们进行依次依赖收集，这样因为渲染函数里面用到了计算属性，因此计算属性 value 值就会和渲染函数产生依赖关系。

```js
const effetcFn = effect(getter, {
  lazy: true,
  scheduler() {
    dirty = true;
    // 派发更新，执行和 value 相关的函数，也就是渲染函数。
    trigger(obj, TriggerOpTypes.SET, "value");
  },
});
```

接下来添加配置项 scheduler，之后无论是 state.a 的变化，还是 state.b 的变化，都会进入到 scheduler，而在 scheduler 中，重新将 dirty 标记为脏数据，然后派发和 value 相关的更新即可。



完整的代码如下：

```js
import { effect } from "./effect/effect.js";
import track from "./effect/track.js";
import trigger from "./effect/trigger.js";
import { TriggerOpTypes, TrackOpTypes } from "./utils.js";

function normalizeParameter(getterOrOptions) {
  let getter, setter;
  if (typeof getterOrOptions === "function") {
    getter = getterOrOptions;
    setter = () => {
      console.warn(`Computed property was assigned to but it has no setter.`);
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  return { getter, setter };
}

/**
 *
 * @param {*} getterOrOptions 可能是函数，也可能是对象
 */
export function computed(getterOrOptions) {
  // 1. 第一步，先做参数归一化
  const { getter, setter } = normalizeParameter(getterOrOptions);

  // value 用于记录计算属性的值，dirty 用于标识是否需要重新计算
  let value,
    dirty = true;
  // 将 getter 传入 effect，getter 里面的响应式属性就会和 getter 建立依赖关系
  const effetcFn = effect(getter, {
    lazy: true,
    scheduler() {
      dirty = true;
      trigger(obj, TriggerOpTypes.SET, "value");
      console.log("j");
    },
  });

  // 2. 第二步，返回一个新的对象
  const obj = {
    // 外部获取计算属性的值
    get value() {
      track(obj, TrackOpTypes.GET, "value");
      if (dirty) {
        // 第一次会进来，先计算一次，然后将至缓存起来
        value = effetcFn();
        dirty = false;
      }
      // 直接计算出来的值
      return value;
    },
    set value(newValue) {
      setter(newValue);
    },
  };
  return obj;
}
```

## 9.watch

**回顾watch的用法**

```js
const x = reactive({
  a: 1,
  b: 2
})

// 单个 ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter 函数
watch(
  () => x.a + x.b,
  (sum) => {
    console.log(`sum is: ${sum}`)
  }
)
```

简单总结起来，就是前面的响应式数据发生变化，重新执行后面的回调函数。回调函数的参数列表中，会传入新的值和旧的值。

另外 watch 还接收第三个参数，是一个选项对象，可以的配置的值有：

- immediate：立即执行一次回调函数
- once：只执行一次
- flush
  - post：在侦听器回调中能访问被 Vue 更新之后的所属组件的 DOM
  - sync：在 Vue 进行任何更新之前触发

watch 方法会返回一个函数，该函数用于停止侦听

```js
const unwatch = watch(() => {})

// ...当该侦听器不再需要时
unwatch()
```

**实现watch方法**

首先写一个工具方法 traverse：

```js
function traverse(value, seen = new Set()) {
  // 检查 value 是否是对象类型，如果不是对象类型，或者是 null，或者已经访问过，则直接返回 value。
  if (typeof value !== "object" || value === null || seen.has(value)) {
    return value;
  }

  // 将当前的 value 添加到 seen 集合中，标记为已经访问过，防止循环引用导致的无限递归。
  seen.add(value);

  // 使用 for...in 循环遍历对象的所有属性。
  for (const key in value) {
    // 递归调用 traverse，传入当前属性的值和 seen 集合。
    traverse(value[key], seen);
  }

  // 返回原始值
  return value;
}
```

该方法的主要作用是递归遍历一个对象及其所有嵌套的属性，从而触发这些属性的依赖收集。

这个方法在 watch 函数中很重要，因为它确保了所有嵌套属性的依赖关系都能被追踪到，当它们变化时能够触发回调函数。

假设有一个深层嵌套的对象：

```js
const obj = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3
    }
  }
};
```

那么整个遍历过程如下：

- 由于 obj 是对象，并且没有访问过，会将 obj 添加到 seen 集合里面
- 遍历 obj 的属性：
  - 访问 obj.a 是数字，会直接返回，不做进一步的处理
  - 访问 obj.b，会进入 traverse(obj.b, seen)
    - 由于 obj.b 是对象，并且未被访问过，将 obj.b 添加到 seen 集合中。
    - 遍历 obj.b 的属性：
      - 访问 obj.b.c 是数字，会直接返回，不做进一步的处理
      - 访问 obj.b.d，会进入 traverse(obj.b.d, seen)
        - 由于 obj.b.d 是对象，并且未被访问过，将 obj.b.d 添加到 seen 集合中。
        - 遍历 obj.b.d 的属性：
          - 访问 obj.b.c.e 是数字，会直接返回，不做进一步的处理

在这个过程中，每次访问一个属性（例如 obj.b 或 obj.b.d），都会触发依赖收集。这意味着当前活动的 effect 函数会被记录为这些属性的依赖。



接下来咱们仍然是进行参数归一化：

```js
/**
 * @param {*} source 
 * @param {*} cb 要执行的回调函数
 * @param {*} options 选项对象
 * @returns
 */
export function watch(source, cb, options = {}) {
  let getter;
  if (typeof source === "function") {
    getter = source;
  } else {
    getter = () => traverse(source);
  }
}
```

在上面的代码中，无论用户的 source 是传递什么类型的值，都转换为函数（这里没有考虑数组的情况）

- source 本来就是函数：直接将 source 赋值给 getter
- source 是一个响应式对象：转换为一个函数，该函数会调用 traverse 方法

接下来定义两个变量，用于存储新旧两个值：

```js
let oldValue, newValue;
```

好了，接下来轮到 effect 登场了：

```js
const effectFn = effect(() => getter(), {
  lazy: true,
  scheduler: () => {
    newValue = effectFn();
    cb(newValue, oldValue);
    oldValue = newValue;
  },
});
```

这段代码，首先会运行 getter 函数（前面做了参数归一化，已经将 getter 转换为函数了），getter 函数里面的响应式数据就会被依赖收集，当这些响应式数据发生变化的时候，就需要派发更新。

因为这里传递了 scheduler，因此在派发更新的时候，实际上执行的就是 scheduler 对应的函数，实际上也就是这三行代码：

```js
newValue = effectFn();
cb(newValue, oldValue);
oldValue = newValue;
```

这三行代码的意思也非常明确：

- newValue = effectFn( )：重新执行一次 getter，获取到新的值，然后把新的值给 newValue
- cb(newValue, oldValue)：调用用户传入的换掉函数，将新旧值传递过去
- oldValue = newValue：更新 oldValue



再往后走，代码就非常简单了，在此之前之前，我们先把 scheduler 对应的函数先提取出来：

```js
const job = () => {
  newValue = effectFn();
  cb(newValue, oldValue);
  oldValue = newValue;
};

const effectFn = effect(() => getter(), {
  lazy: true,
  scheduler: job
});
```

然后实现 immediate，如下：

```js
if (options.immediate) {
  job();
} else {
  oldValue = effectFn();
}
```

immediate 的实现无外乎就是立马派发一次更新。而如果没有配置 immediate，实际上也会执行一次依赖函数，只不过算出来的值算作旧值，而非新值。



接下来执行取消侦听，其实也非常简单：

```js
return () => {
  cleanup(effectFn);
};
```

就是返回一个函数，函数里面调用 cleanup 将依赖清除掉即可。

你会发现只要前面响应式系统写好了，接下来的这些实现都非常简单。



最后我们再优化一下，添加 flush 配置项的 post 值的支持。flush 的本质就是指定调度函数的执行时机，当 flush 的值为 post 的时候，代表调用函数需要将最终执行的更新函数放到一个微任务队列中，等待 DOM 更新结束后再执行。

代码如下所示：

```js
const effectFn = effect(() => getter(), {
  lazy: true,
  scheduler: () => {
    if (options.flush === "post") {
      Promise.resolve().then(job);
    } else {
      job();
    }
  },
});
```

完整代码如下：

```js
import { effect, cleanup } from "./effect/effect.js";

/**
 * @param {*} source 
 * @param {*} cb 要执行的回调函数
 * @param {*} options 选项对象
 * @returns
 */
export function watch(source, cb, options = {}) {
  let getter;
  if (typeof source === "function") {
    getter = source;
  } else {
    getter = () => traverse(source);
  }

  // 用于保存上一次的值和当前新的值
  let oldValue, newValue;

  // 这里的 job 就是要执行的函数
  const job = () => {
    newValue = effectFn();
    cb(newValue, oldValue);
    oldValue = newValue;
  };

  const effectFn = effect(() => getter(), {
    lazy: true,
    scheduler: () => {
      if (options.flush === "post") {
        Promise.resolve().then(job);
      } else {
        job();
      }
    },
  });

  if (options.immediate) {
    job();
  } else {
    oldValue = effectFn();
  }

  return () => {
    cleanup(effectFn);
  };
}

function traverse(value, seen = new Set()) {
  // 检查 value 是否是对象类型，如果不是对象类型，或者是 null，或者已经访问过，则直接返回 value。
  if (typeof value !== "object" || value === null || seen.has(value)) {
    return value;
  }

  // 将当前的 value 添加到 seen 集合中，标记为已经访问过，防止循环引用导致的无限递归。
  seen.add(value);

  // 使用 for...in 循环遍历对象的所有属性。
  for (const key in value) {
    // 递归调用 traverse，传入当前属性的值和 seen 集合。
    traverse(value[key], seen);
  }

  // 返回原始值
  return value;
}
```

---

-EOF-

## 10.指令

目前为止，我们学习过很多 Vue 的内置指令，例如：

- v-if
- v-show
- v-for
- v-model
- v-html
- v-bind
- v-on
- ......

结合 vite-plugin-inspect 插件的编译结果来进行分析指令的本质。



**v-if**

```vue
<template>
  <div v-if="type === 1">type 的值为 1</div>
  <div v-else-if="type === 2">type 的值为 2</div>
  <div v-else-if="type === 3">type 的值为 3</div>
  <div v-else-if="type === 4">type 的值为 4</div>
  <div v-else>Not 1/2/3/4 is 0</div>
  <button @click="toogleFunc">Toggle</button>
</template>

<script setup>
import { ref } from 'vue'
const type = ref(1)
function toogleFunc() {
  type.value = Math.floor(Math.random() * 5)
}
</script>

<style scoped></style>
```

编译结果如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-27-030545.png" alt="image-20240527110545681" style="zoom:50%;" />

对于 v-if 指令，背后对应的就是三目运算符写的不同分支。

每一次 $setup.type 值的变化就会导致渲染函数重新执行，然后进入到不同的分支。



**v-for**

```vue
<template>
  <div>
    <h2>商品列表</h2>
    <ul>
      <!-- 使用 v-for 遍历 products 数组，渲染每个商品的信息 -->
      <li v-for="(product, index) in products" :key="index">
        {{ product.name }} - ${{ product.price }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const products = ref([
  { name: '键盘', price: 99.99 },
  { name: '鼠标', price: 59.99 },
  { name: '显示器', price: 299.99 }
])
</script>

<style scoped></style>
```

编译结果如下：

![image-20240527110842602](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-27-030842.png)

生成的渲染函数里面，用到了一个名为 renderList 的内部方法。

renderList：packages/runtime-core/src/helpers/renderList.ts



**v-bind**

```vue
<template>
  <div v-bind:id>dynamicId</div>
</template>

<script setup>
import { ref } from 'vue'
const id = ref('my-id')
</script>

<style lang="scss" scoped></style>
```

编译后的结果如下：

![image-20240527111250108](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-27-031250.png)

这里就是将 $setup.id 的值作为 div 的 id 属性值，这里涉及到了响应式数据的读取，因此 $setup.id 的值发生变化的时候，渲染函数会重新执行，div 对应的属性也会发生变化。



**v-on**

```vue
<template>
  <div>{{ count }}</div>
  <button v-on:click="count++">+1</button>
</template>

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<style lang="scss" scoped></style>
```

编译结果如下：

![image-20240527111601754](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-27-031602.png)

这个也非常简单，编译结果就是为 button 元素添加上了 click 事件，该事件对应的事件处理函数为：

```js
$event => $setup.count++
```



通过这么几个例子，我们对比编译前后的结果，可以得出一个结论：

最终编译出来的渲染函数，根本不存在什么指令，**不同的指令会被编译为不同处理**。

## 11.插槽

复习插槽的概念：

- 子组件：通过 slot 来设置插槽
- 父组件：使用子组件时可以往 slot 的位置插入模板内容

插槽**使用层面**的本质：**父组件向子组件传递模板内容**

- 默认插槽：拥有默认的一些内容
- 具名插槽：给你的插槽取一个名字
- 作用域插槽：数据来自于子组件，通过插槽的形式传递给父组件使用



**父组件传递内容的本质**

传递的是一个对象：

```js
{
  default: function(){ ... },
  xxx: function(){ ... },
  xxx: function(){ ... },
}
```

对于上面的例子来讲，父组件传递的就是这样的一个对象：

```jsx
{
  default: function(){
    // 注意返回值是对应结构的虚拟 DOM
    return (
    	 <div class="card-content">
        <img src="./assets/landscape.jpeg" alt="Beautiful landscape" class="card-image" />
        <p>探索未知的自然风光，记录下每一个令人惊叹的瞬间。加入我们的旅程，一起见证世界的壮丽。</p>
      </div>
    )
  },
  header: function(){
    return (
    	<div>摄影作品</div>
    )
  }
}
```

父组件向子组件传递过去的东西本质上是函数，通过调用这些函数，能够得到对应结构的虚拟 DOM.



**子组件设置插槽的本质**

其实就是对父组件传递过来的函数进行调用，得到对应的虚拟 DOM.

```js
const slots = {
  default: function(){ ... },
  xxx: function(){ ... },
  xxx: function(){ ... },
}; // 该对象是父组件传递过来的对象
slots.default(); // 得到要渲染的虚拟DOM 
slots.header(); // 得到要渲染的虚拟DOM
slots.xxx(); // 得到要渲染的虚拟DOM                   
```



**进行验证**

最后，我们需要对上面的说法进行验证。

```js
import { defineComponent, h, ref } from 'vue'
import styles from './CardComponent.module.css'

export default defineComponent({
  name: 'CardComponent',
  setup(_, { slots }) {
    const title = ref('这是子组件标题222')
    const deaultSlotsVNode = slots.default()
    let headerSlotsVnode = null
    // 如果传递了header插槽，就调用header插槽
    if (slots.header) {
      headerSlotsVnode = slots.header({
        title: title.value
      })
    }
    // 但是要注意，调用了之后，不见得有值，所以要判断一下
    if (!headerSlotsVnode.length) {
      headerSlotsVnode = h('div', null, '默认标题')
    }
    return () =>
      h('div', { class: styles.card }, [
        h('div', { class: styles['card-header'] }, headerSlotsVnode),
        h('div', { class: styles['card-body'] }, deaultSlotsVNode)
      ])
  }
})
```



## 12.v-model

v-model的用法，总结起来就是两个场景：

1. 表单元素和响应式数据双向绑定
2. 父子组件传递数据

**和表单元素绑定**

```vue
<template>
  <div>
    <p>输入的内容为：{{ message }}</p>
    <input type="text" v-model="message" placeholder="请输入内容" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const message = ref('Hello')
</script>

<style>
input {
  padding: 8px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
```

在上面的示例中，input 元素和 message 这个响应式数据做了双向绑定。

input 元素所输入的值会影响 message 这个响应式数据的值；message 响应式数据的改变也会影响 input 元素。



**和子组件进行绑定**

App.vue

```vue
<template>
  <div class="app-container">
    <h1>请给产品打分：</h1>
    <!-- 通过 v-model 将父组件的状态值传递给子组件 -->
    <RatingComponent v-model="rating"/>
    <p v-if="rating > 0">您的评分：{{ rating }}/5</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RatingComponent from '@/components/RatingComponent.vue'
const rating = ref(3) // 评分的状态值
</script>

<style>
.app-container {
  max-width: 600px;
  margin: auto;
  text-align: center;
  font-family: Arial, sans-serif;
}

p {
  font-size: 18px;
  color: #333;
}
</style>
```

RatingComponent.vue

```vue
<template>
  <div class="rating-container">
    <span v-for="star in 5" :key="star" class="star" @click="setRating(star)">
      {{ model >= star ? '★' : '☆' }}
    </span>
  </div>
</template>

<script setup>
// 接收父组件通过 v-model 传递过来的状态
const model = defineModel()

function setRating(newRating) {
  // 通过 $emit 方法将新的评分值传递给父组件
  // emit('update:modelValue', newRating);
  model.value = newRating
}
</script>

<style scoped>
.rating-container {
  display: flex;
  font-size: 24px;
  cursor: pointer;
}

.star {
  margin-right: 5px;
  color: gold;
}

.star:hover {
  color: orange;
}
</style>
```

父组件通过 v-model 将自身的数据传递给子组件，子组件通过 defineModel 来拿到父组件传递过来的数据。拿到这个数据之后，不仅可以使用这个数据，还可以修改这个数据。



**v-model 的本质**

通过 vite-plugin-inspect 插件的编译结果来进行分析验证。

首先我们分析第一个场景，和表单元素的双向绑定，编译结果如下：

![image-20240527124828346](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-27-044828.png)

从编译结果我们可以看出，v-model 会被展开为一个名为 onUpdate:modelValue 的自定义事件，该事件对应的事件处理函数：

```js
$event => ($setup.message) = $event;
```

这就解释了为什么输入框输入的值的时候，会影响响应式数据。

而输入框的 value 本身又是和 $setup.message 绑定在一起的，$setup.message 一变化，就会导致渲染函数重新执行，从而看到输入框里面的内容发生了变化。



接下来分析第二个场景，在子组件上面使用 v-model，编译结果如下：

App.vue

![image-20240527125319488](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-27-045319.png)

这里会向子组件传递一个名为 modelValue 的 props，props 对应的值就是 $setup.rating，这正是父组件上面的状态。

除此之外向子组件也传递了一个名为 onUpdate:modelValue 的自定义事件，该事件所对应的事件处理函数：

```js
// 该事件处理函数负责的事情：
// 就是将接收到的值更新组件本身的数据 rating
$event => ($setup.rating) = $event;
```

RatingComponent.vue

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-27-045928.png" alt="image-20240527125928289" style="zoom:50%;" />

对于子组件来讲，就可以通过 modelValue 这个props 来拿到父组件传递过来的数据，并且可以在模板中使用该数据。 

当更新数据的时候，就去触发父组件传递过来的 onUpdate:modelValue 自定义事件，并且将新的值传递过去。

至此，你对官网的这句话：  

>`defineModel` 是一个便利宏。编译器将其展开为以下内容：
>
>- 一个名为 `modelValue` 的 prop，本地 ref 的值与其同步；
>- 一个名为 `update:modelValue` 的事件，当本地 ref 的值发生变更时触发。

有些时候在子组件上面使用 v-model 的时候，可以使用具名的 v-model，此时展开的 props 和自定义事件的名称会有所不同。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-27-050918.png" alt="image-20240527130918162" style="zoom:50%;" />

- Props：modelValue ---> title
- 自定义事件：update:modelValue ---> update:title

---

-EOF-

## 13.setup

setup 语法标签，是目前 Vue3 最推荐的写法。

不过这种写法并非一开始就是这样的，而是一步一步演进而来的。



**Vue2经典写法**

Vue2 时期采用的是 Options API 语法，这是一种经典写法。

TaskManager.vue

```js
export default {
  name: 'TaskManager',
  props: {
    initialTasks: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      tasks: [...this.initialTasks],
      newTaskTitle: '' // 新任务标题
    }
  },
  methods: {
    // 新增任务
    addTask() {
      if (this.newTaskTitle.trim() === '') {
        return
      }
      // 添加新任务
      this.tasks.push({
        id: Date.now(),
        title: this.newTaskTitle,
        completed: false
      })
      this.newTaskTitle = '' // 清空输入框
    },
    // 标记任务已完成
    completeTask(id) {
      const task = this.tasks.find((task) => task.id === id)
      if (task) {
        task.completed = true
        this.$emit('task-completed', task)
      }
    },
    // 标记任务未完成
    uncompleteTask(id) {
      const task = this.tasks.find((task) => task.id === id)
      if (task) {
        task.completed = false
        this.$emit('task-uncompleted', task)
      }
    }
  }
}
```



**Vue3初期写法**

Vue3 时期，官方提出了 Composition API 风格，这种风格能够对组件的共有模块进行一个更好的组合复用。

```js
import { ref, toRefs } from 'vue'
export default {
  name: 'TaskManager',
  props: {
    initialTasks: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  emits: ['task-completed', 'task-uncompleted'],
  setup(props, { emit }) {
    // setup是一个生命周期方法
    // 在该方法中书写数据以及函数
    const { initialTasks } = toRefs(props)
    const tasks = ref([...initialTasks.value]) // 任务列表
    const newTaskTitle = ref('') // 存储新任务的标题

    // 添加任务
    const addTask = () => {
      if (newTaskTitle.value.trim() === '') {
        return
      }
      tasks.value.push({
        id: Date.now(),
        title: newTaskTitle.value,
        completed: false
      })
      newTaskTitle.value = ''
    }
    // 完成任务
    const completeTask = (taskId) => {
      const task = tasks.value.find((task) => task.id === taskId)
      if (task) {
        task.completed = true
        // 触发自定义事件
        emit('task-completed', task)
      }
    }
    // 取消完成任务
    const uncompleteTask = (taskId) => {
      const task = tasks.value.find((task) => task.id === taskId)
      if (task) {
        task.completed = false
        // 触发自定义事件
        emit('task-uncompleted', task)
      }
    }

    // 最后需要返回一个对象
    // 该对象里面就包含了需要在模板中使用的数据以及方法
    return {
      tasks,
      newTaskTitle,
      addTask,
      completeTask,
      uncompleteTask
    }
  }
}
```

可以看出，早期的 Vue3 的 CompositionAPI 写法，实际上有 OptionsAPI 写法的影子，和 Vue2 的语法有一定的相似性，同样都是导出一个对象，最重要的特点是对象中多了一个 setup 函数。

这是一个新的生命周期钩子方法，在该方法中，我们可以定义对应的数据和方法，并且在最后返回出去，在模板中可以使用所返回的数据和方法。



**defineComponent写法**

defineComponent 是 Vue 3 中引入的一个**辅助函数**，主要用于定义 Vue 组件，特别是在使用 **TypeScript 时提供更好的类型推断和校验**。

通过使用 defineComponent，我们可以：

1.  自动推断类型：减少显式类型注解，使代码更简洁。
2.  减少冗余：不需要手动定义 Props 接口和响应式数据的类型。
3.  提高可读性：使代码更易读、更易维护。

```js
import { defineComponent, toRefs, ref } from 'vue'
export default defineComponent({
  name: 'TaskManager',
  props: {
    initialTasks: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  emits: ['task-completed', 'task-uncompleted'],
  setup(props, { emit }) {
    // setup是一个生命周期方法
    // 在该方法中书写数据以及函数
    const { initialTasks } = toRefs(props)
    const tasks = ref([...initialTasks.value]) // 任务列表
    const newTaskTitle = ref('') // 存储新任务的标题

    // 添加任务
    const addTask = () => {
      if (newTaskTitle.value.trim() === '') {
        return
      }
      tasks.value.push({
        id: Date.now(),
        title: newTaskTitle.value,
        completed: false
      })
      newTaskTitle.value = ''
    }
    // 完成任务
    const completeTask = (taskId) => {
      const task = tasks.value.find((task) => task.id === taskId)
      if (task) {
        task.completed = true
        // 触发自定义事件
        emit('task-completed', task)
      }
    }
    // 取消完成任务
    const uncompleteTask = (taskId) => {
      const task = tasks.value.find((task) => task.id === taskId)
      if (task) {
        task.completed = false
        // 触发自定义事件
        emit('task-uncompleted', task)
      }
    }

    // 最后需要返回一个对象
    // 该对象里面就包含了需要在模板中使用的数据以及方法
    return {
      tasks,
      newTaskTitle,
      addTask,
      completeTask,
      uncompleteTask
    }
  }
})
```

可以看出，defineComponent 仅仅只是一个辅助方法，和 TS 配合得更好。但是并没有从本质上改变初期 Composition API 的写法。



**setup标签写法**

从 Vue3.2 版本开始正式引入了 setup 语法糖，它**简化了使用 Composition API 时的书写方式**，使得组件定义更加简洁和直观。

其优化的点主要如下：

1. 简化书写：在传统的 setup 函数中，我们需要返回一个对象，其中包含需要在模板中使用的变量和方法。在 \<script setup> 中，这一步被省略了，所有定义的变量和方法会自动暴露给模板使用，从而减少了样板代码。
2. 更好的类型推断：在 \<script setup> 中所有定义的内容都是顶层变量，TypeScript 的类型推断更加直观和简单。

```js
import { ref, toRefs } from 'vue'

const props = defineProps({
  initialTasks: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['task-completed', 'task-uncompleted'])

const { initialTasks } = toRefs(props)
const tasks = ref([...initialTasks.value]) // 任务列表
const newTaskTitle = ref('') // 存储新任务的标题
// 添加任务
const addTask = () => {
  if (newTaskTitle.value.trim() === '') {
    return
  }
  tasks.value.push({
    id: Date.now(),
    title: newTaskTitle.value,
    completed: false
  })
  newTaskTitle.value = ''
}
// 完成任务
const completeTask = (taskId) => {
  const task = tasks.value.find((task) => task.id === taskId)
  if (task) {
    task.completed = true
    // 触发自定义事件
    emit('task-completed', task)
  }
}
// 取消完成任务
const uncompleteTask = (taskId) => {
  const task = tasks.value.find((task) => task.id === taskId)
  if (task) {
    task.completed = false
    // 触发自定义事件
    emit('task-uncompleted', task)
  }
}
```

在 setup 语法糖中，没有了模板语法，定义的数据以及方法能够直接在模板中使用。

另外通过 defineProps 获取到父组件传递过来的 props，通过 defineEmits 来触发父组件的事件。

究竟什么是宏呢？宏这个概念最初是在 C 语言里面引入的，大家知道，C 语言是编译型语言，在开始编译之前，会对**宏代码进行一个文本替换的操作**，这就被称之为**预处理**。

举个例子，在 C 语言中通过 #define 来定义宏：

```c
#define PI 3.14159
#define SQUARE(x) ((x) * (x))

int main() {
    double area = PI * SQUARE(5);
    return 0;
}
```

在编译开始之前，会将 PI 替换为 3.14159，将 SQUARE(5) 替换为 ((5) * (5))

理解了这个，回头再看 defineProps 以及 defineEmits，你就非常好理解了，这两个部分的代码回头会被替换掉，替换成 Vue3 刚出来时的写法。

```js
export default {
  // ...
  props: {
    initialTasks: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  emits: ['task-completed', 'task-uncompleted'],
  // ...
}
```

这一点可以从 vite-plugin-inspect 插件的编译分析中得到验证。

从插件的编译分析中，我们可以看出，setup标签写法其实就是一个语法糖，方便开发者书写，在编译的时候最终会被编译为 CompositionAPI 早期的写法。



**expose上的区别**

**setup 虽然说是一种语法糖，不过在某些行为上的表现还是和原始的 Composition API 有一些区别的**，例如 expose.

这里需要先解释一下什么是 expose：

>一般来讲，父组件管理父组件的数据和方法，子组件管理子组件的数据和方法，如果涉及到通信，那么通过 props 的方式来进行传递。但如果一个组件通过 ref 获取到组件实例，在早期的 Composition API 中，能够拿到组件内部所有数据和方法的。

Vue 提供了一个名为 expose 的方法，由组件自己来决定，如果外部拿到我这个组件实例，我能暴露哪些成员给对方。

```js
export default {
  setup(props, { emit, expose }) {
    expose({
      // 要暴露的成员
    })
  }
}
```

而到了 setup 标签写法中，则**默认行为就是不向外部暴露任何的成**员。如果想要暴露某个成员，仍然是通过 expose 的方式，这里会涉及到一个 defineExpose 的宏。

```js
defineExpose({
  // 要暴露的成员
})
```

---

-EOF-

## 14.组件生命周期

官方生命周期图：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-04-12-031421.png" alt="lifecycle" style="zoom:50%;" />

### 完整生命周期

这里分为这么几个大的阶段：

1. 初始化选项式 API
2. 模板编译
3. 初始化渲染
4. 更新组件
5. 销毁组件

**1. 初始化选项式API**

当渲染器遇到一个组件的时候，首先是**初始化选项式 API**，这里在内部**还会涉及到组件实例对象的创建**。

在组件实例对象创建的前后，就对应着一组生命周期钩子函数：

- 组件实例创建前：setup、beforeCreate
- 组件实例创建后：created

**2. 模板编译**

接下来会进入模板编译的阶段，当模板编译的工作结束后，会执行 beforeMount 钩子函数。

**3. 初始化渲染**

接下来是初始化渲染，到了这个阶段，意味着已经生成了真实的 DOM. 完成初始化渲染后会执行 mounted 生命周期方法。

**4. 更新组件**

更新组件时对应着一组生命周期钩子方法：

- 更新前：beforeUpdate
- 更新后：updated

**5. 销毁组件**

销毁组件时也对应一组生命周期钩子方法：

- 销毁前：beforeUnmount
- 销毁后：unmounted

一般在销毁组件时我们会做一些清理工作，例如清除计时器等操作。

另外需要注意在 Vue3 中生命周期的钩子函数的名字和上面所介绍的生命周期稍微有一些区别：

| 生命周期名称       | Vue2          | Vue3            |
| ------------------ | ------------- | --------------- |
| beforeCreate 阶段  | beforeCreate  | setup           |
| created 阶段       | created       | setup           |
| beforeMount 阶段   | beforeMount   | onBeforeMount   |
| mounted 阶段       | mounted       | onMounted       |
| beforeUpdate 阶段  | beforeUpdate  | onBeforeUpdate  |
| updated 阶段       | updated       | onUpdated       |
| beforeUnmount 阶段 | beforeDestroy | onBeforeUnmount |
| unmounted 阶段     | destoryed     | onUnmounted     |

Vue2 和 Vue3 的生命周期钩子方法是可以共存的，这意味着你在一个组件中可以写 mounted 和 onMounted，Vue3 的生命周期钩子函数的执行时机会比 Vue2 对应的生命周期钩子函数要早一些，不过一般没人会这么写。

### 生命周期的本质

**所谓生命周期，其实就是在合适的时机调用用户所设置的回调函数**。

首先需要了解组件实例和组件挂载。假设用户书写了这么一个组件：

```js
export default {
  name: 'UserCard',
  props: {
    name: String,
    email: String,
    avatarUrl: String
  },
  data(){
    return {
      foo: 1
    }
  },
  mounted() {
    // ...
  },
  render() {
    return h('div', { class: styles.userCard }, [
      h('img', {
        class: styles.avatar,
        src: this.avatarUrl,
        alt: 'User avatar'
      }),
      h('div', { class: styles.userInfo }, [h('h2', this.name), h('p', this.email)])
    ])
  }
}
```

那么这些内容实际上是一个**选项对象**，回头在渲染这个组件的时候，某些信息是会被挂到组件实例上面的。**组件实例本质就是一个对象，该对象维护着组件运行过程中的所有信息**，例如：

- 注册到组件的生命周期钩子函数
- 组件渲染的子树
- 组件是否已经被挂载
- 组件自身的状态

```js
function mountComponent(vnode, container, anchor) {
  // 获取选项对象
  const componentOptions = vnode.type;
  // 从选项对象上面提取出 render 以及 data
  const { render, data } = componentOptions;

  // 创建响应式数据
  const state = reactive(data());

  // 定义组件实例，一个组件实例本质上就是一个对象，它包含与组件有关的状态信息
  const instance = {
    // 组件自身的状态数据，即 data
    state,
    // 一个布尔值，用来表示组件是否已经被挂载，初始值为 false
    isMounted: false,
    // 组件所渲染的内容，即子树（subTree）
    subTree: null,
  };

  // 将组件实例设置到 vnode 上，用于后续更新
  vnode.component = instance;

  // 后面逻辑略...
}

```

下面是组件挂载：

```js
function mountComponent(vnode, container, anchor) {
  // 前面逻辑略...
  
  effect(
    () => {
      // 调用组件的渲染函数，获得子树
      const subTree = render.call(state, state);
      // 检查组件是否已经被挂载
      if (!instance.isMounted) {
        // 初次挂载，调用 patch 函数第一个参数传递 null
        patch(null, subTree, container, anchor);
        // 重点：将组件实例的 isMounted 设置为 true，这样当更新发生时就不会再次进行挂载操作，
        // 而是会执行更新
        instance.isMounted = true;
      } else {
        // 当 isMounted 为 true 时，说明组件已经被挂载，只需要完成自更新即可，
        // 所以在调用 patch 函数时，第一个参数为组件上一次渲染的子树，
        // 意思是，使用新的子树与上一次渲染的子树进行打补丁操作
        patch(instance.subTree, subTree, container, anchor);
      }
      // 更新组件实例的子树
      instance.subTree = subTree;
    },
    { scheduler: queueJob }
  );
}
```

其核心就是根据组件实例的 isMounted 属性来判断该组件是否是初次挂载：

- 初次挂载：patch 的第一个参数为 null；会设置组件实例 isMounted 为 true
- 非初次挂载：更新组件的逻辑，patch 的第一个参数是组件上一次渲染的子树，从而和新的子树进行 diff 计算

**所谓生命周期，就是在合适的时机执行用户传入的回调函数**。

```js
function mountComponent(vnode, container, anchor) {
  const componentOptions = vnode.type;
  // 从组件选项对象中取得组件的生命周期函数
  const {
    render,
    data,
    beforeCreate,
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
  } = componentOptions;
  
  // 拿到生命周期钩子函数之后，就会在下面的流程中对应的位置调用这些钩子函数

  // 在这里调用 beforeCreate 钩子
  beforeCreate && beforeCreate();

  const state = reactive(data());

  const instance = {
    state,
    isMounted: false,
    subTree: null,
  };
  vnode.component = instance;

  // 组件实例已经创建
  // 此时在这里调用 created 钩子
  created && created.call(state);

  effect(
    () => {
      const subTree = render.call(state, state);
      if (!instance.isMounted) {
        // 在这里调用 beforeMount 钩子
        beforeMount && beforeMount.call(state);
        patch(null, subTree, container, anchor);
        instance.isMounted = true;
        // 在这里调用 mounted 钩子
        mounted && mounted.call(state);
      } else {
        // 在这里调用 beforeUpdate 钩子
        beforeUpdate && beforeUpdate.call(state);
        patch(instance.subTree, subTree, container, anchor);
        // 在这里调用 updated 钩子
        updated && updated.call(state);
      }
      instance.subTree = subTree;
    },
    { scheduler: queueJob }
  );
}
```

在上面的代码中，首先从组件的选项对象中获取到注册到组件上面的生命周期函数，然后内部会在合适的时机调用它们。

### 嵌套结构下的生命周期

组件之间是可以进行嵌套的，从而形成一个组件树结构。那么当遇到多组件嵌套的时候，各个组件的生命周期是如何运行的呢？

实际上非常简单，就是一个递归的过程。

假设 A 组件下面嵌套了 B 组件，那么渲染 A 的时候会执行 A 的 onBeforeMount，然后是 B 组件的 onBeforeMount，然后 B 正常挂载，执行 B 组件的 mounted，B 渲染完成后，接下来才是 A 的 mounted.

1. 组件 A：onBeforeMount
2. 组件 B：onBeforeMount
3. 组件 B：mounted
4. 组件 A：mounted

倘若涉及到组件的销毁，也同样是递归的逻辑。

---

-EOF-

## 15.1 KeepAlive生命周期

keep-alive 这个词借鉴于 HTTP 协议。在 HTTP 协议中，KeepAlive 被称之为 **HTTP持久连接（HTTP persistent connection）**，其作用是允许多个请求或响应共用一个 TCP 连接。

在没有 KeepAlive 的情况下，一个 HTTP 连接会在每次请求/响应结束后关闭，当下一次请求发生时，会建立一个新的 HTTP 连接。频繁地销毁、创建 HTTP 连接会带来额外的性能开销，KeepAlive 就是为了解决这个问题而诞生的。

HTTP 中的 KeepAlive 可以避免连接频繁地销毁/创建，与 HTTP 中的 KeepAlive 类似，Vue 里面的 keep-alive 组件也是用于**对组件进行缓存，避免组件被频繁的销毁/重建**。

**回顾基本使用**

简单回忆一下 keep-alive 的使用

```vue
<template>
	<Tab v-if="currentTab === 1">...</Tab>
	<Tab v-if="currentTab === 2">...</Tab>
	<Tab v-if="currentTab === 3">...</Tab>
</template>
```

根据变量 currentTab 值的不同，会渲染不同的 \<Tab> 组件。当用户频繁地切换 Tab 时，会导致不停地卸载并重建 \<Tab> 组件。为了避免因此产生的性能开销，可以使用 keep-alive 组件来解决这个问题：

```vue
<template>
	<keep-alive>
  	<Tab v-if="currentTab === 1">...</Tab>
		<Tab v-if="currentTab === 2">...</Tab>
		<Tab v-if="currentTab === 3">...</Tab>	
  </keep-alive>
</template>
```

这样，无论用户怎样切换 \<Tab> 组件，都不会发生频繁的创建和销毁，因为会极大的优化对用户操作的响应，尤其是在大组件场景下，优势会更加明显。

另外 keep-alive 还可以设计一些属性来进行细节方面的把控：

- include：指定要缓存的组件，支持的书写方式有**字符串、正则表达式、数组**
- exclude：排除不缓存的组件
- max：指定最大缓存组件数。如果缓存的实例数量即将超过指定的那个最大数量，则最久没有被访问的缓存实例将被销毁，以便为新的实例腾出空间。



**keep-alive生命周期**

当一个组件挂载以及卸载的时候，是会触发相关的生命周期钩子方法。

当我们从组件 A 切换到组件 B 时，会依次出发：

- 组件 A beforeUnmount
- 组件 B created
- 组件 B beforeMount
- 组件 A unmounted
- 组件 B mounted

这就是没有使用 keep-alive 缓存的情况，组件频繁的创建、销毁，性能上面会有损耗。

当我们添加 keep-alive 之后，组件得以缓存。但是这也带来一个新的问题，就是我们不知道该组件是否处于激活状态。比如某些场景下，我们需要组件激活时执行某些任务，但是因为目前组件被缓存了，上面的那些生命周期钩子方法都不会再次执行了。

此时，和 keep-alive 相关的两个生命周期钩子方法可以解决这个问题：

- onActivated：首次挂载，以及组件激活时触发
- onDeactivated：组件卸载，以及组件失活时触发

---

-EOF-

## 15.2 keepalive的本质

**keep-alive基本实现**

keep-alive 组件的实现**需要渲染器层面的支持**。当组件需要卸载的时候，不能真的卸载，否则就无法维持组件当前的状态了。

因此正确的做法是：将需要 keep-alive 的组件搬运到一个**隐藏的容器**里面，从而实现“假卸载”。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-28-045458.png" alt="image-20240528125458303" style="zoom:50%;" />

当 keep-alive 的组件需要重新挂载的时候，也是直接从隐藏的容器里面再次搬运到原来的容器。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-28-045719.png" alt="image-20240528125719080" style="zoom:50%;" />

这个过程其实就对应了组件的两个生命周期：

- activated
- deactivated

一个最基本的 keep-alive 组件，实现起来并不复杂，代码如下：

```js
const KeepAlive = {
  // 这是 keepalive 组件独有的属性，用于标识这是一个 keepalive 组件
  __isKeepAlive: true,
  setup(props, { slots }) {
    // 这是一个缓存对象
    // key：vnode.type
    // value: vnode
    const cache = new Map()
    // 存储当前 keepalive 组件的实例
    const instance = currentInstance;
    // 这里从组件实例上面解构出来两个方法，这两个方法实际上是由渲染器注入的
    const { move, createElement } = instance.keepAliveCtx;
    
    // 创建隐藏容器
    const storageContainer = createElement("div");
    
    // 这两个方法所做的事情，就是将组件从页面和隐藏容器之间进行移动
    // 这两个方法在渲染器中会被调用
    instance._deActivate = (vnode) => {
      move(vnode, storageContainer);
    };
    instance._activate = (vnode, container, anchor) => {
      move(vnode, container, anchor);
    };

    
    return () => {
      // 获取到默认插槽里面的内容
      let rawVNode = slots.default();
      
      // 如果不是对象，说明是非组件的虚拟节点，直接返回
      if (typeof rawVNode.type !== "object") {
        return rawVNode;
      }
      
      // 接下来我们从缓存里面找一下，看当前的组件是否存在于缓存里面
      const cachedVNode = cache.get(rawVNode.type);
      
      if (cachedVNode) {
        // 缓存中存在
        // 如果缓存中存在，直接使用缓存的组件实例
        rawVNode.component = cachedVNode.component;
        // 并且挂上一个 keptAlive 属性
        rawVNode.keptAlive = true;
      } else {
        // 缓存中不存在
        // 那么就添加到缓存里面，方便下次使用
        cache.set(rawVNode.type, rawVNode);
      }
      // 接下来又挂了一个 shouldKeepAlive 属性
      rawVNode.shouldKeepAlive = true;
      // 将 keepalive 组件实例也添加到 vnode 上面，后面在渲染器中有用
      rawVNode.keepAliveInstance = instance;
      return rawVNode;
    };
  },
};
```

**keep-alive 和渲染器是结合得比较深的**，keep-alive 组件**本身并不会渲染额外的什么内容**，它的渲染函数最终只返回需要被 keep-alive 的组件，这样的组件我们可以称之为“内部组件”。

keep-alive 组件会对这些组件添加一些标记属性，以便渲染器能够根据这些标记属性执行一些特定的逻辑：

- keptAlive：标识内部组件已经被缓存了，这样当内部组件需要重新渲染的时候，渲染器并不会重新挂载它，而是将其激活。

```js
// 渲染器内部代码片段
function patch(n1, n2, container, anchor) {
  if (n1 && n1.type !== n2.type) {
    unmount(n1);
    n1 = null;
  }

  const { type } = n2;

  if (typeof type === "string") {
    // 省略部分代码
  } else if (type === Text) {
    // 省略部分代码
  } else if (type === Fragment) {
    // 省略部分代码
  } else if (typeof type === "object" || typeof type === "function") {
    // component
    if (!n1) {
      // 如果该组件已经被 KeepAlive，则不会重新挂载它，而是会调用_activate 来激活它
      if (n2.keptAlive) {
        n2.keepAliveInstance._activate(n2, container, anchor);
      } else {
        mountComponent(n2, container, anchor);
      }
    } else {
      patchComponent(n1, n2, anchor);
    }
    
  }
}
```

- shouldKeepAlive：该属性会被添加到 vnode 上面，这样当渲染器卸载内部组件的时候，不会真正的去卸载，而是将其移动到隐藏的容器里面

```js
// 渲染器代码片段
function unmount(vnode) {
  if (vnode.type === Fragment) {
    vnode.children.forEach((c) => unmount(c));
    return;
  } else if (typeof vnode.type === "object") {
    // vnode.shouldKeepAlive 是一个布尔值，用来标识该组件是否应该 KeepAlive
    if (vnode.shouldKeepAlive) {
      // 对于需要被 KeepAlive 的组件，我们不应该真的卸载它，而应调该组件的父组件，
      // 即 KeepAlive 组件的 _deActivate 函数使其失活
      vnode.keepAliveInstance._deActivate(vnode);
    } else {
      unmount(vnode.component.subTree);
    }
    return;
  }
  const parent = vnode.el.parentNode;
  if (parent) {
    parent.removeChild(vnode.el);
  }
}
```

- keepAliveInstance：该属性让内部组件持有了 KeepAlive 的组件实例，回头在渲染器中的某些场景下可以通过该属性来访问 KeepAlive 组件实例上面的 \_deActivate 以及 \_activate。



**include和exclude**

默认情况下，keep-alive 会对所有的“内部组件”进行缓存。

不过有些时候用户只期望缓存特定的组件，此时可以使用 include 和 exclude.

```vue
<keep-alive include="TextInput,Counter">
  <component :is="Component" />
</keep-alive>
```

因此 keep-alive 组件需要定义相关的 props：

```js
const KeepAlive = {
  __isKeepAlive: true,
  props: {
    include: RegExp,
    exclude: RegExp
  },
  setup(props, { slots }) {
    // ...
  }
};
```

在进入缓存之前，我们需要对该组件是否匹配进行判断：

```js
const KeepAlive = {
  __isKeepAlive: true,
  props: {
    include: RegExp,
    exclude: RegExp,
  },
  setup(props, { slots }) {
    // 省略部分代码...

    return () => {
      let rawVNode = slots.default();
      if (typeof rawVNode.type !== "object") {
        return rawVNode;
      }

      const name = rawVNode.type.name;
      if (
        name &&
        ((props.include && !props.include.test(name)) ||
          (props.exclude && props.exclude.test(name)))
      ) {
        return rawVNode;
      }

      // 进入缓存的逻辑...
    };
  },
};
```



**缓存管理**

目前为止的缓存实现如下：

```js
const cachedVNode = cache.get(rawVNode.type);
if (cachedVNode) {
  rawVNode.component = cachedVNode.component;
  rawVNode.keptAlive = true;
} else {
  cache.set(rawVNode.type, rawVNode);
}
```

目前缓存的设计，只要缓存不存在，总是会设置新的缓存。这会导致缓存不断的增加，极端情况下会占用大量的内容。

为了解决这个问题，keep-alive 组件允许用户设置缓存的阀值，当组件缓存数量超过了指定阀值时会对缓存进行修剪

```vue
<keep-alive :max="3">
  <component :is="Component" />
</keep-alive>
```

因此在设计 keep-alive 组件的时候，新增一个 max 的 props：

```js
const KeepAlive = {
  __isKeepAlive: true,
  props: {
    include: RegExp,
    exclude: RegExp,
    max: Number
  },
  setup(props, { slots }) {
    // ...
  }
};
```

接下来需要有一个能够修剪缓存的方法：

```ts
function pruneCacheEntry(key: CacheKey) {
  const cached = cache.get(key) as VNode
  
  // 中间逻辑略...
  
  cache.delete(key)
  keys.delete(key)
}
```

然后是更新缓存的队列：

```ts
const cachedVNode = cache.get(key)
if (cachedVNode) {
  // 其他逻辑略...
 
  // 进入此分支，说明缓存队列里面有，有的话就更新一下顺序
  // 保证当前这个在缓存中是最新的
  // 先删除，再添加即可
  keys.delete(key)
  keys.add(key)
} else {
  // 说明缓存中没有，说明是全新的，先添加再修剪
  keys.add(key)
  if (max && keys.size > parseInt(max as string, 10)) {
    // 进入此分支，说明当前添加进去的组件缓存已经超过了最大值，进行删除
    pruneCacheEntry(keys.values().next().value)
  }
}
```



- keep-alive 核心原理就是将内部组件搬运到隐藏容器，以及从隐藏容器搬运回来。因为没有涉及到真正的卸载，所以组件状态也得以保留。
- keep-alive 和渲染器是结合得比较深的，keep-alive 会给内部组件添加一些特殊的标识，这些标识就是给渲染器的用，回头渲染器在挂载和卸载组件的时候，会根据这些标识执行特定的操作。
- include 和 exclude 核心原理就是对内部组件进行一个匹配操作，匹配上了再进入后面的缓存逻辑
- max：添加之前看一下缓存里面有没有缓存过该组件
  - 缓存过：更新到队列最后
  - 没有缓存过：加入到缓存里面，但是要看一下有没有超过最大值，超过了就需要进行修剪。

## 16.key

在关系型数据库中，有一个 primary key 的概念，这个其实和这里的 key 有一定的相似性。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-25-100513.png" alt="image-20240525180513474" style="zoom:50%;" />

在关系型数据库中，**primary key 用于标记这条数据的唯一性**，因此在上表中只有 id 这个字段能够作为主键，另外 3 个字段都不行。

那么为什么需要对一条数据做唯一性标识呢？那就是**方便精准的查找**。这就好比现实生活中的身份证号，所有人都是独一无二的，你名字可能相同、年龄、性别这些都可能相同，而身份证号则是每个人的一个唯一标识，能够精准找到这个人。

Vue 中的 key，道理就是一样的，key 其实也是用来做唯一标识，谁的唯一标识呢，就是**虚拟节点 VNode 的唯一标识**。

**不采用复用策略**

假设更新前的虚拟 DOM 为：

```js
const oldVNode = {
  type: 'div',
  children: [
    {type: 'p', children: '1'},
    {type: 'p', children: '2'},
    {type: 'p', children: '3'},
  ]
}
```

```html
<div>
  <p>1</p>
  <p>2</p>
  <p>3</p>
</div>
```

更新后的虚拟 DOM 为：

```js
const newVNode = {
  type: 'div',
  children: [
    {type: 'p', children: '4'},
    {type: 'p', children: '5'},
    {type: 'p', children: '6'},
  ]
}
```

如果完全不采用复用策略，那么当更新子节点的时候，需要执行 6 次 DOM 操作。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-26-151420.png" alt="image-20240526231419917" style="zoom:50%;" />

- 卸载所有旧的子节点，需要 3 次 DOM 的删除操作
- 挂载所有新的子节点，需要 3 次 DOM 的添加操作

通过观察我们发现，VNode 的变化，仅仅是 p 元素的子节点（文本节点）发生变化，p 元素本身其实没有任何的变化。因此最为理想的做法是更新这个 3 个 p 元素的文本节点内容，这样只会涉及到 3 次 DOM 操作，性能提升一倍。



**采用复用策略**

1. 先考虑更新前后长度不变、类型不变的情况

这里可以写出如下的伪代码：

```js
function patchChildren(n1, n2, container){
  if(typeof n2.children === 'string'){
    // 说明该节点的子节点就是文本节点
    // ...
  } else if(Array.isArray(n2.children)){
    // 说明该节点的子节点也是数组
    const oldChildren = n1.children; // 旧的子节点数组
    const newChildren = n2. children; // 新的子节点数组
    
    // 目前假设长度没有变化
    for(let i = 0; i < oldChildren.length; i++){
      // 对文本子节点进行更新
      patch(oldChildren[i], newChildren[i])
    }
  } else {
    // 其他情况
    // ...
  }
}
```



2. 考虑长度发生变化的情况

   - 对于新节点更多的情况，那就需要**挂载新的节点**

   <img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-26-153701.png" alt="image-20240526233701292" style="zoom:50%;" />

   - 对于新节点变少的情况，那就需要**卸载多余的旧节点**

   <img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-26-153533.png" alt="image-20240526233532828" style="zoom:50%;" />

因此我们的伪代码会发生一些变化：

```js
function patchChildren(n1, n2, container){
  if(typeof n2.children === 'string'){
    // 说明该节点的子节点就是文本节点
    // ...
  } else if(Array.isArray(n2.children)){
    // 说明该节点的子节点也是数组
    const oldChildren = n1.children; // 旧的子节点数组
    const newChildren = n2. children; // 新的子节点数组
    
    // 存储一下新旧节点的长度
    const oldLen = oldChildren.length; // 旧子节点数组长度
    const newLen = newChildren.length; // 新子节点数组长度
    
    // 接下来先找这一组长度的公共值，也就是最小值
    const commonLength = Math.min(oldLen, newLen);
    
    // 先遍历最小值，把该处理的节点先跟新
    for(let i = 0; i < commonLength; i++){
      // 对文本子节点进行更新
      patch(oldChildren[i], newChildren[i])
    }
    
    // 然后接下来处理长度不同的情况
    if(newLen > oldLen){
      // 新节点多，那么就做新节点的挂载
      for(let i = commonLength; i < newLen; i++){
        patch(null, newChildren[i], container);
      }
    } else if(oldLen > newLen){
      // 旧节点多，做旧节点的卸载
      for(let i = commonLength; i < oldLen; i++){
        unmount(oldChildren[i]);
      }
    }
  } else {
    // 其他情况
    // ...
  }
}
```



3. 考虑类型发生变化

```js
const oldVNode = {
  type: 'div',
  children: [
    {type: 'p', children: '1'},
    {type: 'div', children: '2'},
    {type: 'span', children: '3'},
  ]
}
```

```js
const newVNode = {
  type: 'div',
  children: [
    {type: 'span', children: '3'},
    {type: 'p', children: '1'},
    {type: 'div', children: '2'},
  ]
}
```

按照目前上面的设计，当遇到这种情况的时候，通通不能复用，又回到最初的情况，需要 6 次 DOM 的操作。

但是我们稍作观察，会发现上面的例子中仅仅是元素标签移动了位置，因此最理想的情况是移动 DOM 即可，这样也能达到对 DOM 节点的复用。

这里涉及到一个问题：如何确定是同一个类型能够复用的节点？

如果仅仅只是判断 VNode 的 type 值是否相同，这种方式并不可靠！

```js
const oldVNode = {
  type: 'div',
  children: [
    {type: 'p', children: '3'},
    {type: 'div', children: '2'},
    {type: 'p', children: '1'},
  ]
}
```

```js
const newVNode = {
  type: 'div',
  children: [
    {type: 'p', children: '1'},
    {type: 'p', children: '3'},
    {type: 'div', children: '2'},
  ]
}
```

在这种情况下，没有办法很好的有一个对应关系，因为有多种相同类型的节点。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-27-002244.png" alt="image-20240527082244205" style="zoom:50%;" />



**加入key标识**

key 相当于给每一个 VNode 一个身份证号，通过这个身份证号就可以找到唯一的那个 VNode，而非多个。

```js
const oldVNode = {
  type: 'div',
  children: [
    {type: 'p', children: '3', key: 1},
    {type: 'div', children: '2', key: 2},
    {type: 'p', children: '1', key: 3},
  ]
}
```

```js
const newVNode = {
  type: 'div',
  children: [
    {type: 'p', children: '1', key: 3},
    {type: 'p', children: '3', key: 1},
    {type: 'div', children: '2', key: 2},
  ]
}
```

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-27-002600.png" alt="image-20240527082559913" style="zoom:50%;" />

因此，在实际的判断中，如果 VNode 的 type 属性和 key 属性都相同，那么就说明是同一组映射，并且在新旧节点中都出现了，那么就可以进行 DOM 节点的复用。

>哪怕没有 key，我在旧节点中找到一个类型相同的，就复用该 DOM 节点，这样的设计不行么？

实际上，在没有 key 的情况下，Vue 内部采用的就是这样的复用策略，这种策略在 Vue 中被称之为“就地更新”策略。这种策略默认是高效的，**但是这种复用策略仅仅是保证 DOM 节点的类型对上了**，如果节点本身还依赖**子组件状态或者临时 DOM 状态**，<u>由于这种复用策略没有精准的对上号，因此会涉及到子组件状态或者临时 DOM 状态的还原</u>。

举个例子，假设旧节点是三个男生，新节点也是三个男生

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-27-010403.png" alt="image-20240527090403134" style="zoom:50%;" />

如果不考虑其他的因素，只考虑是否是男生，然后简单的把名字变一下，那么这种就地复用的策略是非常高效。

但是很多时候依赖子组件状态或者临时的 DOM 状态：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-27-011310.png" alt="image-20240527091310616" style="zoom:50%;" />

在这种情况下，就地复用的策略反而是低效的，因为涉及到子组件状态或者临时的 DOM 状态的恢复。

因此在这个时候，最好的方式就是加上 key，让新旧节点能够精准的对应上。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-05-27-011647.png" alt="image-20240527091647134" style="zoom:50%;" />

还有一点需要注意，那就是 **避免使用下标来作为 key 值**。使用下标作为 key 值时，如果列表中的元素顺序发生变化，Vue 会复用错误的元素，导致不必要的 DOM 更新和渲染错误。

例如，当你在列表中插入或删除元素时，使用下标会使得每个元素的 key 发生变化，导致 Vue 不能正确识别元素，从而导致状态和数据的不一致。

```js
// 初始状态
[{ id: 1, text: 'Item 1' }, { id: 2, text: 'Item 2' }, { id: 3, text: 'Item 3' }]

// 删除第二个元素后的状态
[{ id: 1, text: 'Item 1' }, { id: 3, text: 'Item 3' }]
```

在这种情况下，如果使用下标作为 key 值，当删除第二个元素后，第三个元素的下标会从 2 变为 1，这会使 Vue 误以为原本的第三个元素和第二个元素是同一个，从而导致错误的更新。



key 本质上就是给 VNode 节点做唯一性标识，算是 VNode 的一个身份证号。

特别是在渲染列表时。key 的作用主要有以下几点：

1. **高效的更新：** key 帮助 Vue 识别哪些元素是变化的、哪些是新的、哪些是需要被移除的。
   - 在没有 key 的情况下，Vue 会尽量复用已有元素，而不管它们的实际内容是否发生了变化，这可能导致不必要的更新或者错误的更新。
   - 通过使用 key，Vue 可以准确地知道哪些元素发生了变化，从而高效地更新 DOM。
2. **确保元素的唯一性：** key 属性需要是唯一的，这样每个元素在列表中都可以被唯一标识。这避免了在元素移动、插入或删除时出现混淆，确保 Vue 可以正确地追踪每个元素。
3. **提升渲染性能：** 使用 key 可以显著提升列表渲染的性能。因为 Vue 能通过 key 快速定位到需要更新的元素，而不是重新渲染整个列表。尤其在处理大型列表时，使用 key 可以避免大量不必要的 DOM 操作，提升应用的响应速度。

---

-EOF-

## 17.diff算法

1、相同的前置元素和后置元素
不同于简单 Diff 算法和双端 Diff 算法，快速 Diff 算法包含预处理步骤，这其实是借鉴了纯文本 Diff 算法的思路。在纯文本Diff 算法中，存在对两段文本进行预处理的过程。例如，在对两段文本进行 Diff 之前，可以先对它们进行全等比较：

```js
01 if (text1 === text2) return
```

这也称为快捷路径。如果两段文本全等，那么就无须进入核心Diff 算法的步骤了。除此之外，预处理过程还会处理两段文本相同的前缀和后缀。假设有如下两段文本：

```js
01 TEXT1: I use vue for app development
02 TEXT2: I use react for app development
```

通过肉眼可以很容易发现，这两段文本的头部和尾部分别有一段相同的内容，如下图所示：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/13ada5e30d0b8114578d06db5c79855d.png)

上图突出显示了 TEXT1 和 TEXT2 中相同的内容。对于内容相同的问题，是不需要进行核心 Diff 操作的。因此，对于TEXT1 和 TEXT2 来说，真正需要进行 Diff 操作的部分是：

```js
01 TEXT1: vue
02 TEXT2: react
```

这实际上是简化问题的一种方式。这么做的好处是，在特定情况下我们能够轻松地判断文本的插入和删除，例如：

```js
01 TEXT1: I like you
02 TEXT2: I like you too
```

经过预处理，去掉这两段文本中相同的前缀内容和后缀内容之后，它将变成：

```js
01 TEXT1:
02 TEXT2: too
```

可以看到，经过预处理后，TEXT1 的内容为空。这说明 TEXT2在 TEXT1 的基础上增加了字符串 too。相反，我们还可以将这两段文本的位置互换：

```js
01 TEXT1: I like you too
02 TEXT2: I like you
```

这两段文本经过预处理后将变成：

```js
01 TEXT1: too
02 TEXT2:
```

由此可知，TEXT2 是在 TEXT1 的基础上删除了字符串 too。

快速 Diff 算法借鉴了纯文本 Diff 算法中预处理的步骤。以下图给出的两组子节点为例：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/45668e475b00800aa287ef9021539bc9.png)

这两组子节点的顺序如下：

- 旧的一组子节点：p-1、p-2、p-3。
- 新的一组子节点：p-1、p-4、p-2、p-3。

通过观察可以发现，两组子节点具有相同的前置节点 p-1，以及相同的后置节点 p-2 和 p-3，如下图所示：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/f7436b953f2670d22c98dc28fc89af88.png)

对于相同的前置节点和后置节点，由于它们在新旧两组子节点中的相对位置不变，所以我们无须移动它们，但仍然需要在它们之间打补丁。

对于前置节点，我们可以建立索引 j，其初始值为 0，用来指向两组子节点的开头，如下图所示：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/dfc2529168f3f3b429954b406a30bd75.png)

然后开启一个 while 循环，让索引 j 递增，直到遇到不相同的节点为止，如下面 patchKeyedChildren 函数的代码所示：

```javascript
function patchKeyedChildren(n1, n2, container) {
  const newChildren = n2.children
  const oldChildren = n1.children
  // 处理相同的前置节点
  // 索引 j 指向新旧两组子节点的开头
  let j = 0
  let oldVNode = oldChildren[j]
  let newVNode = newChildren[j]
  // while 循环向后遍历，直到遇到拥有不同 key 值的节点为止
  while (oldVNode.key === newVNode.key) {
    // 调用 patch 函数进行更新
    patch(oldVNode, newVNode, container)
    // 更新索引 j，让其递增
    j++
    oldVNode = oldChildren[j]
    newVNode = newChildren[j]
  }
}
```

在上面这段代码中，我们使用 while 循环查找所有相同的前置节点，并调用 patch 函数进行打补丁，直到遇到 key 值不同的节点为止。这样，我们就完成了对前置节点的更新。在这一步更新操作过后，新旧两组子节点的状态如下图所示：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/338512d36c3653170efb669876a50f23.png)

这里需要注意的是，当 while 循环终止时，索引 j 的值为 1。接下来，我们需要处理相同的后置节点。由于新旧两组子节点的数量可能不同，所以我们需要两个索引 newEnd 和 oldEnd，分别指向新旧两组子节点中的最后一个节点，如下图所示：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/6861de85a5998380920b5189bfe6c0d0.png)

然后，再开启一个 while 循环，并从后向前遍历这两组子节点，直到遇到 key 值不同的节点为止，如下面的代码所示：

```javascript
01 function patchKeyedChildren(n1, n2, container) {
02   const newChildren = n2.children
03   const oldChildren = n1.children
04   // 更新相同的前置节点
05   let j = 0
06   let oldVNode = oldChildren[j]
07   let newVNode = newChildren[j]
08   while (oldVNode.key === newVNode.key) {
09     patch(oldVNode, newVNode, container)
10     j++
11     oldVNode = oldChildren[j]
12     newVNode = newChildren[j]
13   }
14
15   // 更新相同的后置节点
16   // 索引 oldEnd 指向旧的一组子节点的最后一个节点
17   let oldEnd = oldChildren.length - 1
18   // 索引 newEnd 指向新的一组子节点的最后一个节点
19   let newEnd = newChildren.length - 1
20
21   oldVNode = oldChildren[oldEnd]
22   newVNode = newChildren[newEnd]
23
24   // while 循环从后向前遍历，直到遇到拥有不同 key 值的节点为止
25   while (oldVNode.key === newVNode.key) {
26     // 调用 patch 函数进行更新
27     patch(oldVNode, newVNode, container)
28     // 递减 oldEnd 和 nextEnd
29     oldEnd--
30     newEnd--
31     oldVNode = oldChildren[oldEnd]
32     newVNode = newChildren[newEnd]
33   }
34
35 }
```

与处理相同的前置节点一样，在 while 循环内，需要调用patch 函数进行打补丁，然后递减两个索引 oldEnd、newEnd 的值。在这一步更新操作过后，新旧两组子节点的状态如下图所示：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/bb81fdae7cc23437a01ed559b97e5e0c.png)

由上图可知，当相同的前置节点和后置节点被处理完毕后，旧的一组子节点已经全部被处理了，而在新的一组子节点中，还遗留了一个未被处理的节点 p-4。其实不难发现，节点 p-4是一个新增节点。那么，如何用程序得出“节点 p-4 是新增节点”这个结论呢？这需要我们观察三个索引 j、newEnd 和oldEnd 之间的关系：

条件一 oldEnd < j 成立：说明在预处理过程中，所有旧子节点都处理完毕了。
条件二 newEnd >= j 成立：说明在预处理过后，在新的一组子节点中，仍然有未被处理的节点，而这些遗留的节点将被视作新增节点。
如果条件一和条件二同时成立，说明在新的一组子节点中，存在遗留节点，且这些节点都是新增节点。因此我们需要将它们挂载到正确的位置，如下图所示：
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/ddb4538a21eb9da4df65f60c14dee976.png)

在新的一组子节点中，索引值处于 j 和 newEnd 之间的任何节点都需要作为新的子节点进行挂载。那么，应该怎样将这些节点挂载到正确位置呢？这就要求我们必须找到正确的锚点元素。观察上图 中新的一组子节点可知，新增节点应该挂载到节点 p-2 所对应的真实 DOM 前面。所以，节点 p-2 对应的真实 DOM 节点就是挂载操作的锚点元素。有了这些信息，我们就可以给出具体的代码实现了，如下所示：

```js
01 function patchKeyedChildren(n1, n2, container) {
02   const newChildren = n2.children
03   const oldChildren = n1.children
04   // 更新相同的前置节点
05   // 省略部分代码
06
07   // 更新相同的后置节点
08   // 省略部分代码
09
10   // 预处理完毕后，如果满足如下条件，则说明从 j --> newEnd 之间的节点应作为新节点插入
11   if (j > oldEnd && j <= newEnd) {
12     // 锚点的索引
13     const anchorIndex = newEnd + 1
14     // 锚点元素
15     const anchor = anchorIndex < newChildren.length ? newChildren[anchorIndex].el : null
16     // 采用 while 循环，调用 patch 函数逐个挂载新增节点
17     while (j <= newEnd) {
18       patch(null, newChildren[j++], container, anchor)
19     }
20   }
21
22 }
```

在上面这段代码中，首先计算锚点的索引值（即anchorIndex）为 newEnd + 1。如果小于新的一组子节点的数量，则说明锚点元素在新的一组子节点中，所以直接使用newChildren[anchorIndex].el 作为锚点元素；否则说明索引newEnd 对应的节点已经是尾部节点了，这时无须提供锚点元素。有了锚点元素之后，我们开启了一个 while 循环，用来遍历索引 j 和索引 newEnd 之间的节点，并调用 patch 函数挂载它们。

上面的案例展示了新增节点的情况，我们再来看看删除节点的情况，如下图所示：
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/61477b30bcd6907bb6eab2b5a20921e8.png)

在这个例子中，新旧两组子节点的顺序如下：

- 旧的一组子节点：p-1、p-2、p-3。
- 新的一组子节点：p-1、p-3。

我们同样使用索引 j、oldEnd 和 newEnd 进行标记，如下图所示：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/8bdf318335247e047f63261932bc363a.png)

接着，对相同的前置节点进行预处理，处理后的状态如下图所示：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/1c56f619f90d045b512e0ba0a29618e5.png)

由上图可知，当相同的前置节点和后置节点全部被处理完毕后，新的一组子节点已经全部被处理完毕了，而旧的一组子节点中遗留了一个节点 p-2。这说明，应该卸载节点 p-2。实际上，遗留的节点可能有多个，如下图所示：

![在这里插入图片描述](/Users/zhangchaoqun/Developer/Code/study/文档/39c907ee57e19dd1c0fca8dbba61efa9.png)

索引 j 和索引 oldEnd 之间的任何节点都应该被卸载，具体实现如下：

```js
01 function patchKeyedChildren(n1, n2, container) {
02   const newChildren = n2.children
03   const oldChildren = n1.children
04   // 更新相同的前置节点
05   // 省略部分代码
06
07   // 更新相同的后置节点
08   // 省略部分代码
09
10   if (j > oldEnd && j <= newEnd) {
11     // 省略部分代码
12   } else if (j > newEnd && j <= oldEnd) {
13     // j -> oldEnd 之间的节点应该被卸载
14     while (j <= oldEnd) {
15       unmount(oldChildren[j++])
16     }
17   }
18
19 }
```

在上面这段代码中，我们新增了一个 else…if 分支。当满足条件j > newEnd && j <= oldEnd 时，则开启一个 while 循环，并调用 unmount 函数逐个卸载这些遗留节点。

2、判断是否需要进行 DOM 移动操作
在上一节中，我们讲解了快速 Diff 算法的预处理过程，即处理相同的前置节点和后置节点。但是，上一节给出的例子比较理想化，当处理完相同的前置节点或后置节点后，新旧两组子节点中总会有一组子节点全部被处理完毕。在这种情况下，只需要简单地挂载、卸载节点即可。但有时情况会比较复杂，如下图中给出的例子：
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/e458c7ec81ce872027c0c62d65c60baa.png)

在这个例子中，新旧两组子节点的顺序如下：

旧的一组子节点：p-1、p-2、p-3、p-4、p-6、p-5。
新的一组子节点：p-1、p-3、p-4、p-2、p-7、p-5。
可以看到，与旧的一组子节点相比，新的一组子节点多出了一个新节点 p-7，少了一个节点 p-6。这个例子并不像上一节给出的例子那样理想化，我们无法简单地通过预处理过程完成更新。在这个例子中，相同的前置节点只有 p-1，而相同的后置节点只有 p-5，如下图所示：
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/b5b5672a8d9e569ba81197085466f42f.png)

下图给出了经过预处理后两组子节点的状态：

![在这里插入图片描述](/Users/zhangchaoqun/Developer/Code/study/文档/5e8f407efcdc87f78530dafa897114d3.png)

可以看到，经过预处理后，无论是新的一组子节点，还是旧的一组子节点，都有部分节点未经处理。这时就需要我们进一步处理。怎么处理呢？其实无论是简单 Diff 算法，还是双端 Diff 算法，抑或本章介绍的快速 Diff 算法，它们都遵循同样的处理规则：

- 判断是否有节点需要移动，以及应该如何移动；

- 找出那些需要被添加或移除的节点。

所以接下来我们的任务就是，判断哪些节点需要移动，以及应该如何移动。观察下图可知，在这种非理想的情况下，当相同的前置节点和后置节点被处理完毕后，索引 j、newEnd 和oldEnd 不满足下面两个条件中的任何一个：

- j > oldEnd && j <= newEnd
- j > newEnd && j <= oldEnd

因此，我们需要增加新的 else 分支来处理上图所示的情况，如下面的代码所示：

```js
01 function patchKeyedChildren(n1, n2, container) {
02   const newChildren = n2.children
03   const oldChildren = n1.children
04   // 更新相同的前置节点
05   // 省略部分代码
06
07   // 更新相同的后置节点
08   // 省略部分代码
09
10   if (j > oldEnd && j <= newEnd) {
11     // 省略部分代码
12   } else if (j > newEnd && j <= oldEnd) {
13     // 省略部分代码
14   } else {
15     // 增加 else 分支来处理非理想情况
16   }
17
18 }
```

后续的处理逻辑将会编写在这个 else 分支内。知道了在哪里编写处理代码，接下来我们讲解具体的处理思路。首先，我们需要构造一个数组 source，它的长度等于新的一组子节点在经过预处理之后剩余未处理节点的数量，并且 source 中每个元素的初始值都是 -1，如下图所示：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/b9b6503965635182c81b949ba96e2e7a.png)

我们可以通过下面的代码完成 source 数组的构造：

```js
01 if (j > oldEnd && j <= newEnd) {
02   // 省略部分代码
03 } else if (j > newEnd && j <= oldEnd) {
04   // 省略部分代码
05 } else {
06   // 构造 source 数组
07   // 新的一组子节点中剩余未处理节点的数量
08   const count = newEnd - j + 1
09   const source = new Array(count)
10   source.fill(-1)
11 }
```

快速 Diff 算法在实测中性能最优。它借鉴了文本 Diff 中的预处理思路，先处理新旧两组子节点中相同的前置节点和相同的后置节点。当前置节点和后置节点全部处理完毕后，如果无法简单地通过挂载新节点或者卸载已经不存在的节点来完成更新，则需要根据节点的索引关系，构造出一个最长递增子序列。最长递增子序列所指向的节点即为不需要移动的节点。
**核心思路**
相较于双端diff，快速diff先对新旧节点进行了头尾的预处理，找出头部与尾部开始的相同节点，并对非相同部分进行移动处理
根据预处理后新节点剩余部分构建数组 source 用于依次存储剩余 newChildred 中的节点在 oldChilren 的 idx，若为新增则值为 -1
构建一个索引表 keyIdx，存储新节点中的某一个节点对应的在 newChildren 中的 idx，用于填充 source
遍历 oldChildren 部分，根据 key 值从索引表 keyIdx 中获取此节点在 newChildren 中的idx，存储为 k
4.1 若k不存在，则说明该旧节点需要删除
4.2 若k存在，更新 source
使用 lis 获取 source 的最长子序列 seq。
循环预处理后的newChilren剩余节点，判断当前位置是否处于 最长子序列（不用移动）上，进行插入或移动
快速 Diff 算法在实测中性能最优。它借鉴了文本 Diff 中的预处理 思路，先处理新旧两组子节点中相同的前置节点和相同的后置节点。 当前置节点和后置节点全部处理完毕后，如果无法简单地通过挂载新 节点或者卸载已经不存在的节点来完成更新，则需要根据节点的索引 关系，构造出一个最长递增子序列。最长递增子序列所指向的节点即 为不需要移动的节点

### 前言

当组件发生更新时会重新执行 `render` 方法生成新的 `vnode` 节点，而当 **新旧** `vnode` 都是 **一组节点** 时，为了以最小的性能开销完成 **更新操作**，需要比较两组子节点，其中用于比较的算法就叫 `Diff` 算法。`Vue` 中的 `Diff` 算法实际上也是一个逐步演进的过程，那么下面就来看看它是如何演进、优化成如今的 `Diff` 算法的。

### 简单 diff 算法

在进行 **新旧** 两组子节点的更新时，去遍历 **新旧** 一组子节点中 **长度较短** 的一组，目的是为了尽可能多的调用 `pacth` 函数进行更新。

#### 理想状态

**理想状态** 指新旧一组节点中 **新旧节点前后位置没有发生变化**.

在这个前提下新的一组节点可以比旧的一组子节点多、少或相等：

- 取 **新旧** 一组节点的中 **较短** 的一组长度，作为公共长度 `commonLength`

- 通过以 `commonLength` 作为循环结束的条件，通过 `patch` 函数对当前遍历到的 **新旧** 进行 `pacth` 更新操作

- 若 **新旧** 一组节点的长度一致，那么意味着其全部是 **更新操作**

- `commonLength`长度后的，就代表是属于其他多余的节点，这个多余的节点会根据新旧的具体情况进行不同的处理：
  - **新的** 一组子节点有剩余，则代表有新的节点需要 **挂载**，通过 `patch` 函数进行挂载操作
  - **旧的** 一组子节点有剩余，则代表有旧的节点需要 **卸载**，通过 `unmount` 进行卸载操作

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/62501865c1a749d3ad3f5793cb2cb4c5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

#### 非理想状态

**非理想状态** 指的是 **新旧** 一组子节点中相 **同位置** 的 **节点不相同**.

此时简单 `diff` 算法仍然会以 `commonLength` 进行遍历，并通过 `patch(n1, n2)` 的方式去更新，但在 `pacth` 函数中由于 `n1`、`n2` 节点不是相同节点，此时会直接将 **旧节点** 进行 **卸载**，然后将 **新节点** 进行 **挂载** 操作，哪怕是当前 **新旧** 一组节点中在不同位置有相同的节点可复用，但简单 `diff` 算法完全不知道是否有可复用的节点，它完全是依赖于 `pacth` 来判断当前新旧节点是否是相同的节点。

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/946ddd222d054a34b82ccb3bada59b13~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

#### 小结

显然，简单 `diff` 算法下课通过减少 `DOM` 操作的次数，提升了一定的更新性能，但在非理想状态下，其更新方式和简单直接的更新方式一致：即卸载旧节点、挂载新节点，这意味着它仍然有被优化的空间。

### 基于 key 的简单 diff 算法

上述算法的缺陷在于 **非理想状态** 的 **diff** 的过程仍然比较固定，即只能比较同位置的节点是否一致，那么优化的方式也是显而易见，只需要引入 **key** 用来标识 **新旧一组子节点中** 是否存在相同 `key` 的节点，若存在则复用 **真实 DOM** 节点，即更新和移动 **DOM** 节点即可。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33c324985fe344c3aa49cbe0b8958f26~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

#### 核心

- 通过遍历 **新的一组** 子节点中的节点，去 **旧的一组** 子节点中基于 **`key`** 寻找可复用的节点，找到可复用节点进行 `patch` **更新**
- 根据 `lastIndex` 决定是否要进行 **移动**
- 当 `find` 变量为 `false` 时认为当前节点是需要进行 **挂载**
- 最后在通过 从旧节点中依次查找新节点中去查找，通过 `has` 变量判断是否需要进行 **卸载**

以下是简单的伪代码实现：

```js
function patchChildren(n1, n2, container) {
  if (typeof n2 === "string") {
    // 省略代码
  } else if (Array.isArray(n2.children)) {
    const oldChildren = n1.children; // 旧的一组子节点
    const newChildren = n2.children; // 新的一组子节点

    let lastIndex = 0; // 用于判断当前节点移动的位置

    // 遍历新的一组子节点：更新、移动、挂载
    for (let i = 0; i < newChildren.length; i++) {
      const newVnode = newChildren[i];

      let find = false; // 标识是否能在旧的一组子节点中找到可复用的节点

      let j = 0;
      // 遍历旧的一组子节点
      for (j; j < oldChildren.length; j++) {
        const oldVnode = oldChildren[j];

        // 根据 key 判断是否是相同节点，及是否可复用
        if (newVnode.key === oldVnode.key) {
          find = true;
          // 通过 patch 进行【更新】
          patch(oldVnode, newVnode, container);

          // 若 j < lastIndex 的值，表示需要【移动】
          if (j < lastIndex) {
            // 获取当前节点对应的上一个 preVnode 节点
            const preVnode = newChildren[i - 1];
            // 若上一个 preVnode 节点不存在，则表示当前 vnode 是头节点
            if (preVnode) {
              // 获取上一个节点对应的 preVnode 对应的真实 DOM 的下一个兄弟元素作为锚点元素
              const anchor = preVnode.el.nextSibling;
              // 移动操作
              insert(newVnode.el, container, anchor);
            }
          } else {
            lastIndex = j;
          }

          break;
        }
      }

      // 若 find 仍然为 false，则意味着没有可复用节点
      // 即当前的 newVnode 节点需要被【挂载】
      if (!find) {
        // 挂载也需要挂载到正确的位置，因此需要锚点元素
        const preVnode = newChildren[i - 1];
        let anchor = null;

        if (preVnode) {
          // 若存在前一个 newVnode 节点，则将其真实 DOM 对应的下一个兄弟元素，作为锚点元素
          anchor = preVnode.el.nextSibling;
        } else {
          // 若不存在前一个 newVnode 节点，则将容器节点中的第一个子元素，作为锚点元素
          anchor = container.firstChild;
        }
        // 基于锚点元素挂载新节点
        patch(null, newVnode, container, anchor);
      }
    }

    // 遍历旧的一组子节点：卸载多余旧节点
    for (let i = 0; i < oldChildren.length; i++) {
        // 当前旧节点
        const oldVnode = oldChildren[i];

        // 拿旧的子节点 oldVnode 去新的一组子节点中寻找具有相同 key 值的节点
        const has = newChildren.find(vnode => vnode.key === oldVnode.key);
        
        // 若没有找到相同 key 的节点，则说明需要删除或卸载当前旧节点
        if(!has){
            unmount(oldVnode);
        }
    }
  } else {
    // 省略代码
  }
}
```

#### 小结

实际上 `diff` 操作的目的是 **`更新、移动、挂载、卸载`** 的过程，基于 `key` 可以在 **新旧一组子节点** 中尽可能找到可复用节点，即尽可能的通过 **DOM** 移动操作来完成更新，避免过多地对 **DOM** 元素进行销毁和重建。

虽然实现了尽可能复用 **DOM** 节点，但是上述算法对 **DOM** 的 **移动操作** 仍然不是最优的，其中 `lastIndex` 记录的是 **旧的一组子节点中上次被更新的索引位置**：

- 理论上只需要移动依次 **DOM** 即可完成更新，即只需要将旧 `p3` 节点移动到末尾节点即可
- 而事实上基于以上算法，使得其移动方式并不是最优的，导致了旧 `p1` 和 `p2` 节点对应的真实 `DOM` 节点被移动

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4ecc04262af84244931b4a7338d671a8~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

### 双端 Diff 算法

双端 **Diff** 算法是一种同时对新旧两组子节点的两个端点进行比较的算法.

这是在实践中总结出来的，通常在一组子节点中对基于两端的操作是比较常见的，因此可以基于这样的假设去尽量减少每个新节点都要通过遍历一次旧的一组子节点的操作。

#### 核心

只要 **命中** 以下 **四种假设**，则可以直接通过 `patch()` 进行 **更新**

- 旧的头结点 **等于** 新的头结点，**不需移动**

- 旧的尾节点 **等于** 新的尾节点，**不需移动**

- 旧的头结点 **等于** 新的尾结点，**需要移动**

- 旧的尾节点 **等于** 新的头节点，**需要移动** 若 **不能命中** 这四种假设，那么仍然需要基于 `key` 通过遍历找到 **当前新节点** 在 **老的一组子节点** 中的位置索引：

- 若在老的一组子节点中 

  找到

   当前新节点

  - 且 **是** 同一节点，则通过 `pacth()` 进行 **更新**
  - 且 **不是** 同一节点（`key` 相同，但节点类型不同），则视为新元素，并进行 **挂载** 操作

- 若在老的一组子节点中 **没有找到** 当前新节点，则意味着当前新节点需要进行 **挂载** 操作 当 **老节点** 或者 **新节点** 被遍历完了，就需要对剩余的节点进行操作：

- `oldStartIdx > oldEndIdx` 表示 **老节点遍历完成**，若 **新节点有剩余**，则说明剩余的节点是新增的节点，需要进行挂载 **操作**

- `newStartIdx > newEndIdx` 表示 **新节点遍历完成**，若 **老节点有剩余**，则说明剩余部分节点需要被删除，需要进行 **卸载** 操作

#### 优势

与基于 `key` 的简单 `diff` 算法相比，在相同情况下，原来简单 `diff` 算法需要两次移动 `DOM` 操作才能完成的更新，双端 `diff` 算法只需要一次 `DOM` 移动即可完成更新：

- 第一次比较 **命中假设 4**，即 `oldChildren[oldEndIdx] === newChildren[newStartIdx]`，需要通过 `pacth`进行 **更新**，并将当前旧尾节点对应的 DOM 元素 **移动**到旧头结点之前

  - 此时 `oldEndIdx` 需要 `-1`，而 `newStartIdx` 需要 `+1`

- 第二次比较 **命中假设 1**，即 `oldChildren[oldStartIdx] === newChildren[newStartIdx]`，由于此时属于新旧头结点相同，只需要通过 `pacth`

  进行 **更新**即可

  - 此时 `oldStartIdx` 和 `newStartIdx` 都需要 `+1`

- 第二次比较 **命中假设 1**，即 `oldChildren[oldStartIdx] === newChildren[newStartIdx]`，由于此时属于新旧头结点相同，只需要通过 `pacth`

  进行 **更新**即可

  - 此时 `oldStartIdx` 和 `newStartIdx` 都需要 `+1`

- 最后，由于不满足循环条件 `oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx` 跳出循环，双端 `diff` 结束 ![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/abc9e8f610e14c90ae5aec6710ba0db6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

#### Vue2 中对应源码

```js
*
   diff 过程:
     diff 优化：
               1. 四种假设：
                          newStart === oldStart
                          newEnd === oldEnd
                          newStart === oldEnd
                          newEnd === oldStart

               2. 假设新老节点开头结尾有相同节点的情况: 
                - 一旦命中假设，就避免了一次循环，以提高执行效率
                - 如果没有命中假设，则执行遍历，从老节点中找到新开始节点
                  找到相同节点，则执行 patchVnode，然后将老节点移动到正确的位置

     如果老节点先于新节点遍历结束，则剩余的新节点执行新增节点操作
     如果新节点先于老节点遍历结束，则剩余的老节点执行删除操作，移除这些老节点
  */
  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    // 老节点的开始索引
    let oldStartIdx = 0
    // 新节点的开始索引
    let newStartIdx = 0
    // 老节点的结束索引
    let oldEndIdx = oldCh.length - 1
    // 老节点的第一个子节点
    let oldStartVnode = oldCh[0]
    // 老节点的最后一个子节点
    let oldEndVnode = oldCh[oldEndIdx]
    // 新节点的结束索引
    let newEndIdx = newCh.length - 1
    // 新节点的第一个子节点
    let newStartVnode = newCh[0]
    // 新节点的最后一个子节点
    let newEndVnode = newCh[newEndIdx]

    let oldKeyToIdx, idxInOld, vnodeToMove, refElm

    // removeOnly 是一个特殊的标志，仅由 <transition-group> 使用，
    // 以确保被移除的元素在离开转换期间保持在正确的相对位置
    const canMove = !removeOnly

    if (process.env.NODE_ENV !== 'production') {
      // 检查新节点的 key 是否重复
      checkDuplicateKeys(newCh)
    }

    // 遍历新老两组节点，只要有一组遍历完（开始索引超过结束索引）则跳出循环
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        // 如果节点被移动，在当前索引上可能不存在，检测这种情况，如果节点不存在则调整索引
        oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        // 如果节点被移动，在当前索引上可能不存在，检测这种情况，如果节点不存在则调整索引
        oldEndVnode = oldCh[--oldEndIdx]
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        // 老开始节点和新开始节点是同一个节点，执行 patch
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
        // patch 结束后老开始和新开始的索引分别加 1，开始下一个节点
        oldStartVnode = oldCh[++oldStartIdx]
        newStartVnode = newCh[++newStartIdx]
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        // 老结束和新结束是同一个节点，执行 patch
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
        // patch 结束后老结束和新结束的索引分别减 1，开始下一个节点
        oldEndVnode = oldCh[--oldEndIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        // 老开始和新结束是同一个节点，执行 patch
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
        // 处理被 transtion-group 包裹的组件时使用
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
        // patch 结束后老开始索引加 1，新结束索引减 1，开始下一个节点
        oldStartVnode = oldCh[++oldStartIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        // 老结束和新开始是同一个节点，执行 patch
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
        // patch 结束后，老结束的索引减 1，新开始的索引加 1，开始下一个节点
        oldEndVnode = oldCh[--oldEndIdx]
        newStartVnode = newCh[++newStartIdx]
      } else {
        // 如果上面的四种假设都不成立，则通过遍历找到新开始节点在老节点中的位置索引

        // 找到老节点中每个节点 key 和 索引之间的关系映射：
        // 如 oldKeyToIdx = { key1: idx1, ... }
        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)

        // 在映射中找到新开始节点在老节点中的位置索引
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)

        if (isUndef(idxInOld)) { // New element
          // 在老节点中没找到新开始节点，则说明是新创建的元素，执行创建
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
        } else {
          // 在老节点中找到新开始节点了
          vnodeToMove = oldCh[idxInOld]
          if (sameVnode(vnodeToMove, newStartVnode)) {
            // 如果这两个节点是同一个，则执行 patch
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
            // patch 结束后将该老节点置为 undefined
            oldCh[idxInOld] = undefined
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
          } else {
            // same key but different element. treat as new element
            // 最后这种情况是，找到节点了，但是发现两个节点不是同一个节点，
            // 则视为新元素，执行创建
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
          }
        }
        // 老节点向后移动一个
        newStartVnode = newCh[++newStartIdx]
      }
    }

    // 走到这里，说明老节点或者新节点被遍历完了
    if (oldStartIdx > oldEndIdx) {
      // 老节点被遍历完了，新节点有剩余，则说明这部分剩余的节点是新增的节点，然后添加这些节点
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
    } else if (newStartIdx > newEndIdx) {
      // 新节点被遍历完了，老节点有剩余，说明这部分的节点被删掉了，则移除这些节点
      removeVnodes(oldCh, oldStartIdx, oldEndIdx)
    }
  }
```

### 快速 Diff 算法

`Vue.js 3` 借鉴了 `ivi` 和 `inferno` 这两个框架中使用的算法：**快速 `Diff` 算法**，这个算法的性能优于 `Vue.js 2` 中所采用的 **双端 `Diff` 算法**.

> 以下涉及的源码位置均在：`vue-core-3.2.31-main\packages\runtime-core\src\renderer.ts` 中的 `patchKeyedChildren` 函数中

#### 节点预处理

对于 **相同位置** 的 **前置节点** 和 **后置节点**，由于它们在新旧两组子节点中的相对位置不变，因此并 **不需要** 进行 **移动** 操作，**只需** 进行 `patch` **更新** 即可.

#### 处理前置节点

通过开启一个 `while` 循环，**从前往后** 依次遍历新旧两组子节点：

- 若当前新旧节点 **相同**，则通过 `patch` 进行 **更新**
- 若当前新旧节点 **不同**，则终止循环，即前置节点处理结束

`Vue.js 3` 中对应源码如下：

```js
js

 代码解读
复制代码// 1. sync from start 处理前置节点
// (a b) c
// (a b) d e
while (i <= e1 && i <= e2) {
  const n1 = c1[i]
  const n2 = (c2[i] = optimized
    ? cloneIfMounted(c2[i] as VNode)
    : normalizeVNode(c2[i]))
  if (isSameVNodeType(n1, n2)) {
    patch(
      n1,
      n2,
      container,
      null,
      parentComponent,
      parentSuspense,
      isSVG,
      slotScopeIds,
      optimized
    )
  } else {
    break
  }
  i++
}
```

#### 处理后置节点

通过开启一个 `while` 循环，**从后往前** 依次遍历新旧两组子节点：

- 若当前新旧节点 **相同**，则通过 `patch` 进行 **更新**
- 若当前新旧节点 **不同**，则终止循环，即后置节点处理结束

`Vue.js 3` 中对应源码如下：

```js
// 2. sync from end 处理后置节点
// a (b c)
// d e (b c)
while (i <= e1 && i <= e2) {
  const n1 = c1[e1]
  const n2 = (c2[e2] = optimized
    ? cloneIfMounted(c2[e2] as VNode)
    : normalizeVNode(c2[e2]))
  if (isSameVNodeType(n1, n2)) {
    patch(
      n1,
      n2,
      container,
      null,
      parentComponent,
      parentSuspense,
      isSVG,
      slotScopeIds,
      optimized
    )
  } else {
    break
  }
  e1--
  e2--
}
```

#### 处理剩余已知公共序列的节点

当完成 **节点预处理** 后，很可能出现以下两种情况，而这些剩余节点是很容易根据已处理过的前后节点推断出它们的具体位置的：

- **旧节点遍历完成，新节点有剩余**，此时意味着有新节点需要挂载，通过 `patch` 将剩余新节点依次进行 **挂载**
- **新节点遍历完成，旧节点有剩余**，此时意味着有旧节点需要卸载，通过 `unmount` 将剩余旧节点依次进行 **卸载**

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ce1cb2d384c4507a47ca5c99e36abe1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

`Vue.js 3` 中对应源码如下：

```js
js

 代码解读
复制代码// 3. common sequence + mount
// (a b)
// (a b) c
// i = 2, e1 = 1, e2 = 2
// (a b)
// c (a b)
// i = 0, e1 = -1, e2 = 0
if (i > e1) { // 旧节点遍历完后
  if (i <= e2) { // 新节点还有剩余
    const nextPos = e2 + 1
    const anchor = nextPos < l2 ? (c2[nextPos] as VNode).el : parentAnchor
    while (i <= e2) {
      // 挂载操作
      patch(
        null,
        (c2[i] = optimized
          ? cloneIfMounted(c2[i] as VNode)
          : normalizeVNode(c2[i])),
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      )
      i++
    }
  }
}

// 4. common sequence + unmount
// (a b) c
// (a b)
// i = 2, e1 = 2, e2 = 1
// a (b c)
// (b c)
// i = 0, e1 = 0, e2 = -1
else if (i > e2) { // 新节点遍历完成
  while (i <= e1) { // 旧节点还有剩余
    // 卸载操作
    unmount(c1[i], parentComponent, parentSuspense, true)
    i++
  }
}
```

#### 处理剩余未知序列的节点

直接来看 `vue.js 3` 在源码中举的例子：

```js
旧节点：  [i ... e1 + 1]   =>   a b [c d e] f g
新节点：  [i ... e2 + 1]   =>   a b [e d c h] f g
当前索引： i = 2,  e1 = 4,  e2 = 5
```

其中，经过 **节点预处理** 后的剩余节点，即 `[c d e]` 和 `[e d c h]` 的部分是乱序的，针对这部分节点的处理是很关键的：

- 通过 `toBePatched` 保存新节点的数量，即 `toBePatched = e2 - s2 + 1`

- 基于 `newChildren` 的剩余节点，构造基一个形如 `key: index` 的 `keyToNewIndexMap` 索引映射，本质是一个 `Map` 对象

- 遍历旧的一组节点中剩余为处理的节点，进行 `patch`更新或 `unmount` 卸载

  - 若当前遍历的 **老节点的 key** 能在 `keyToNewIndexMap` 中获取到对应的索引值，则说明当前节点是可复用的节点，可通过 `patch` 进行 **更新**，并通过 `patched` 记录下当前已 **被更新/被复用** 的节点数
  - 若当前遍历的 **老节点的 key** 不能在 `keyToNewIndexMap` 中获取到对应的索引值，则说明当前的老节点通过 `unmount` 进行卸载
  - 若 `patched >= toBePatched`，则说明所有剩余的新节点都已经在剩余旧节点中找到并更新完成，此时需要对旧节点中剩余老节点通过 `unmount` 进行卸载
  - 若当前老节点对应新节点中的索引 **小于** 上一次记录的索引值，则说明当前节点需要移动，将 **`moved`** 变量标识为 **`true`**，便于后续基于 **最长递增子序列** 进行 **移动** 操作

- 通过以上操作后，可以通过构造一个 **最长的稳定子序列**用于后续节点的 **移动**操作，即 **最长递增子序列算法**

  - 通过构建 `newIndexToOldIndexMap` 数组，用于存储 **当前新节点** 在 **老节点中** 的索引值

  - 基于 `newIndexToOldIndexMap` 数组通过 `getSequence(newIndexToOldIndexMap)` 得到最长递增子序列，其中相关算法感兴趣的可自行研究

  - **从后往前**遍历，其中索引 `i`指向新的一组子节点的最后一个节点，而索引 `j`

    指向的是最长递增子序列中的最后一个元素

    - 若当前新节点对应老节点中的索引为 `0`，则说明当前节点需要进行 **挂载**

  - 若 **`moved`** 为 **`true`** 则说明当前新节点需要进行 **移动**

`Vue.js 3` 中对应源码如下：

```js
// 5.3 move and mount
  // generate longest stable subsequence only when nodes have moved
  const increasingNewIndexSequence = moved
    ? getSequence(newIndexToOldIndexMap)
    : EMPTY_ARR
  j = increasingNewIndexSequence.length - 1
  // looping backwards so that we can use last patched node as anchor
  for (i = toBePatched - 1; i >= 0; i--) {
    const nextIndex = s2 + i
    const nextChild = c2[nextIndex] as VNode
    const anchor =
      nextIndex + 1 < l2 ? (c2[nextIndex + 1] as VNode).el : parentAnchor
    if (newIndexToOldIndexMap[i] === 0) {
      // mount new
      patch(
        null,
        nextChild,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      )
    } else if (moved) {
      // move if:
      // There is no stable subsequence (e.g. a reverse)
      // OR current node is not among the stable sequence
      if (j < 0 || i !== increasingNewIndexSequence[j]) {
        move(nextChild, container, anchor, MoveType.REORDER)
      } else {
        j--
      }
    }
  }
```

