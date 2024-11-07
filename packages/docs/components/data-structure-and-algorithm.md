# 一. 概论

## 1. 数据结构

`队列`：一种遵循`先进先出` (FIFO / First In First Out) 原则的一组有序的项；队列在尾部添加新元素，并从头部移除元素。最新添加的元素必须排在队列的末尾。`（例如：去食堂排队打饭，排在前面的人先打到饭，先离开；排在后面的人后打到饭，后离开。）`

`栈`：一种遵从`先进后出` (LIFO) 原则的有序集合；新添加的或待删除的元素都保存在栈的末尾，称作栈顶，另一端为栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底。`（例如：往口袋里面装东西，先装进去的放在最下面，后装进去的放在最上面，取出的时候只能从上往下取。）`

<img src="https://i-blog.csdnimg.cn/blog_migrate/148f18a53cdc61e5e64f59b825d7f22e.png" alt="在这里插入图片描述" style="zoom:33%;" />

<img src="https://i-blog.csdnimg.cn/blog_migrate/b6497bf37fdbef9b4c74a7d4ac9d9de0.gif" alt="在这里插入图片描述" style="zoom:33%;" />

`链表`：存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的；每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（指针/链接）组成。

<img src="https://i-blog.csdnimg.cn/blog_migrate/457a1dc35962c435f2626de2bdc15849.png" alt="在这里插入图片描述" style="zoom:33%;" />

`集合`：由一组无序且唯一（即不能重复）的项组成；这个数据结构使用了与有限集合相同的数学概念，但应用在计算机科学的数据结构中。

`字典`：以 [键，值] 对为数据形态的数据结构，其中键名用来查询特定元素，类似于 Javascript 中的Object。

`哈希表`：根据关键码值(Key value)而直接进行访问的数据结构。通过把关键码值映射到表中某个位置来访问记录，以加快查找的速度。这个映射函数叫做散列函数，存放记录的数组叫散列表。
给定表M，存在函数f(key)，对任意给定的关键字值key，代入函数后若能得到包含该关键字的记录在表中的地址，则称表M为哈希(Hash）表，函数f(key)为哈希(Hash) 函数。

`树`：由 n（n>=1）个有限节点组成一个具有层次关系的集合；把它叫做“树”是因为它看起来像一棵倒挂的树，也就是说它是根朝上，而叶朝下的，基本呈一对多关系，树也可以看做是图的特殊形式。

`图`：图是网络结构的抽象模型；图是一组由边连接的节点（顶点）；任何二元关系都可以用图来表示，常见的比如：道路图、关系图，呈多对多关系。

## 2. 算法

### 排序算法：

`冒泡排序（升序）`：逐一比较相邻两个元素，如果前面的元素比后面的元素大则交换两者顺序；元素项向上移动至正确的顺序，好似气泡上升至表面一般，因此得名。（冒泡排序每一轮至少有一个元素会出现在正确位置）

`快速排序（升序）`：选择一个基准值，每一个元素与基准值比较。比基准值小的元素放在基准值左边，比基准值大的元素放在基准值右边，左右两边递归执行此操作。通常选择中间的元素作为基准值。

`选择排序`：每一次从待排序的数据元素中选出最小（或最大）的一个元素，存放在序列的起始位置，以此循环，直至排序完毕。

`插入排序`：将一个数据插入到已经排好序的有序数据中，从而得到一个新的、个数加一的有序数据，此算法适用于少量数据的排序。

`归并排序`：将原始序列切分成较小的序列，只到每个小序列无法再切分，然后执行合并，即将小序列归并成大的序列，合并过程进行比较排序，只到最后只有一个排序完毕的大序列，时间复杂度为 O(n log n)。

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/7a637703ce22a212929953dae0218cb5.png)

各种时间复杂度的直观比较：

<img src="https://i-blog.csdnimg.cn/blog_migrate/ab93dddd86212643df5a88c6269c300a.png" alt="在这里插入图片描述"  />

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/29f0a3a7bd7c420ab8484d413ccd71e1.png)

### 搜索算法：

`顺序搜索`：让目标元素与列表中的每一个元素逐个比较，直到找出与给定元素相同的元素为止，缺点是效率低下。

`二分搜索`：在一个有序列表，以中间值为基准拆分为两个子列表，拿目标元素与中间值作比较从而再在目标的子列表中递归此方法，直至找到目标元素。

### 其他算法：

`贪心算法`：在对问题求解时，不考虑全局，总是做出局部最优解的方法。

`动态规划`：在对问题求解时，由以求出的局部最优解来推导全局最优解。

`复杂度概念`：一个方法在执行的整个生命周期，所需要占用的资源，主要包括：时间资源、空间资源。

# 二. 数据结构

## 1. 数组

数组的标准定义是：`一个存储元素的线性集合（**collection**），元素可以通过索引来任意存取，索引通常是数字，用来计算元素之间存储位置的偏移量。`

JavaScript中的数组是一种`特殊的对象`，用来表示偏移量的索引是该对象的属性，索引可能是整数。然而，这些数字索引在内部被转换为字符串类型，这是因为JavaScript对象中的属性名必须是字符串。

JavaScript中的数组，严格来说应该称作对象，是`特殊的JavaScript对象`。

#### 1.1 使用数组

##### 创建数组

在`脚本语言`里很常见的一个特性是，`数组中的元素不必是同一种数据类型`，这一点和很多编程语言不同。

大多数JavaScript 专家推荐使用`[]操作符`，和使用Array 的构造函数相比，这种方式被认为效率更高（具体参见O’Reilly 出版的JavaScript: The Definitive Guide 和JavaScript: The Good Parts 这两本书）。

##### 读写数组

使用数组的`length 属性`来控制循环次数，而不是直接使用数字。JavaScript 中的数组也是对象，数组的长度可以任意增长，超出其创建时指定的长度。length 属性反映的是当前数组中元素的个数，使用它，可以确保循环遍历了数组中的所有元素。

##### 由字符串生成数组

调用字符串对象的`split() 方法`也可以生成数组。

##### 对数组的整体性操作

#### 1.2 存取函数

##### 查找元素

`indexOf() 函数`是最常用的存取函数之一，用来`查找传进来的参数在目标数组中是否存在。`如果目标数组包含该参数，就返回该元素在数组中的索引；如果不包含，就返回-1。

如果数组中包含多个相同的元素，indexOf() 函数总是返回第一个与参数相同的元素的索引。有另外一个功能与之类似的函数：`lastIndexOf()`，该函数返回相同元素中最后一个元素的索引，如果没找到相同元素，则返回-1。

##### 数组的字符串表示

有两个方法可以将数组转化为字符串：`join()` 和`toString()`。这两个方法都返回一个包含数组所有元素的字符串，各元素之间用逗号分隔开。

##### 由已有数组创建新数组

concat() 和splice() 方法允许通过已有数组创建新数组。`concat()` 方法可以合并多个数组创建一个新数组，`splice() `方法截取一个数组的子集创建一个新数组。

#### 1.3 可变函数

##### 为数组添加元素

为数组添加元素：push() 和unshift()。`push() `方法会将一个元素添加到数组末尾，`unshift() `方法可以将元素添加在数组的开头。

##### 从数组中删除元素

使用`pop()` 方法可以删除数组末尾的元素，`shift() `方法可以删除数组的第一个元素

pop() 和shift() 方法都将删掉的元素作为方法的返回值返回，因此可以使用一个变量来保存删除的元素

##### 从数组中间位置添加和删除元素

删除数组中的第一个元素和在数组开头添加一个元素存在同样的问题——两种操作都需要将数组中的剩余元素向前或向后移，然而`splice() `方法可以帮助我们执行其中任何一种操作。

使用splice() 方法为数组添加元素，需提供如下参数：

- 起始索引（也就是你希望开始添加元素的地方）；
- 需要删除的元素个数（添加元素时该参数设为 0）；
- 想要添加进数组的元素。

##### 为数组排序

剩下的两个可变方法是为数组排序。

`reverse()`，该方法将数组中元素的顺序进行翻转。

对数组进行排序是经常会遇到的需求，如果元素是字符串类型，那么数组的可变方法sort() 就非常好使，但是如果数组元素是数字类型，sort() 方法的排序结果就不能让人满意了

`sort() `方法是按照字典顺序对元素进行排序的，因此它假定元素都是字符串类型，在上一个例子中，即使元素是数字类型，也被认为是字符串类型。为了让sort() 方法也能排序数字类型的元素，可以在调用方法时传入一个大小比较函数，排序时，sort() 方法将会根据该函数比较数组中两个元素的大小，从而决定整个数组的顺序。

对于数字类型，该函数可以是一个简单的相减操作，从一个数字中减去另外一个数字。如果结果为负，那么被减数小于减数；如果结果为0，那么被减数与减数相等；如果结果为正，那么被减数大于减数。

#### 1.4 迭代器方法

这些方法对数组中的每个元素应用一个函数，可以返回一个值、一组值或者一个新数组。

##### 不生成新数组的迭代器方法

我们要讨论的第一组迭代器方法不产生任何新数组，相反，它们要么对于数组中的每个元素执行某种操作，要么返回一个值。

`forEach()`，该方法接受一个函数作为参数，对数组中的每个元素使用该函数。

`every()`，该方法接受一个返回值为布尔类型的函数，对数组中的每个元素使用该函数。如果对于所有的元素，该函数均返回true，则该方法返回true

`some() `方法也接受一个返回值为布尔类型的函数，只要有一个元素使得该函数返回true，该方法就返回true。

`reduce() `方法接受一个函数，返回一个值。该方法会从一个累加值开始，不断对累加值和数组中的后续元素调用该函数，直到数组中的最后一个元素，最后返回得到的累加值。reduce() 方法也可以用来将数组中的元素连接成一个长的字符串。

`reduceRight()` 方法，和reduce() 方法不同，它是从右到左执行。

##### 生成新数组的迭代器方法

有两个迭代器方法可以产生新数组：map() 和filter()。

`map()` 和forEach() 有点儿像，对数组中的每个元素使用某个函数。两者的区别是map() 返回一个新的数组，该数组的元素是对原有元素应用某个函数得到的结果。

`filter() `和every() 类似，传入一个返回值为布尔类型的函数。和every() 方法不同的是，当对数组中的所有元素应用该函数，结果均为true 时，该方法并不返回true，而是返回一个新数组，该数组包含应用该函数后结果为true 的元素。还可以使用filter() 方法过滤字符串数组

#### 1.5 二维和多维数组

##### 创建二维数组

二维数组类似一种由行和列构成的数据表格。在JavaScript 中创建二维数组，需要先创建一个数组，然后让数组的每个元素也是一个数组。

```js
Array.matrix = function(numrows, numcols, initial) {
  var arr = [];
  for (var i = 0; i < numrows; ++i) {
    var columns = [];
    for (var j = 0; j < numcols; ++j) {
      columns[j] = initial;
    }
    arr[i] = columns;
  }
  return arr;
}
```

##### 处理二维数组的元素

处理二维数组中的元素，有两种最基本的方式：按列访问和按行访问。

对于两种方式，我们均使用一组嵌入式的for 循环。对于按列访问，外层循环对应行，内层循环对应列。

对于按行访问，只需要稍微调整for 循环的顺序，使外层循环对应列，内层循环对应行即可。

##### 参差不齐的数组

参差不齐的数组是指数组中每行的元素个数彼此不同。有一行可能包含三个元素，另一行可能包含五个元素，有些行甚至只包含一个元素。很多编程语言在处理这种参差不齐的数组时表现都不是很好，但是JavaScript 却表现良好，因为每一行的长度是可以通过计算得到的。

#### 1.6 对象数组

#### 1.7 对象中的数组

在对象中，可以使用数组存储复杂的数据。

## 2. 列表

为了设计列表的抽象数据类型，需要给出列表的定义，包括列表应该拥有哪些属性，应该在列表上执行哪些操作。列表是一组有序的数据。每个列表中的数据项称为元素。

在JavaScript 中，列表中的元素可以是任意数据类型。列表中可以保存多少元素并没有事先限定，实际使用时元素的数量受到程序内存的限制。

不包含任何元素的列表称为空列表。列表中包含元素的个数称为列表的length。在内部实现上，用一个变量listSize 保存列表中元素的个数。可以在列表末尾append 一个元素，也可以在一个给定元素后或列表的起始位置insert 一个元素。使用remove 方法从列表中删除元素，使用clear 方法清空列表中所有的元素。

还可以使用toString() 方法显示列表中所有的元素，使用getElement() 方法显示当前元素。

列表拥有描述元素位置的属性。列表有前有后（分别对应front 和end）。使用next() 方法可以从当前元素移动到下一个元素，使用prev() 方法可以移动到当前元素的前一个元素。还可以使用moveTo(n) 方法直接移动到指定位置，这里的n 表示要移动到第n 个位置。currPos 属性表示列表中的当前位置。

列表的抽象数据类型并未指明列表的存储结构，在本章的实现中，我们使用一个数组dataStore 来存储元素。

## 3. 队列

`队列`是一种`列表`，不同的是队列只能在队尾插入元素，在队首删除元素。队列用于存储按顺序排列的数据，先进先出，这点和栈不一样，在栈中，最后入栈的元素反而被优先处理。可以将队列想象成在银行前排队的人群，排在最前面的人第一个办理业务，新来的人只能在后面排队，直到轮到他们为止。队列是一种`先进先出（First-In-First-Out，FIFO）`的数据结构。队列被用在很多地方，比如提交操作系统执行的一系列进程、打印任务池等，一些仿真系统用队列来模拟银行或杂货店里排队的顾客。

### 操作

队列的两种主要操作是：向队列中插入新元素和删除队列中的元素。插入操作也叫做`入队`，删除操作也叫做`出队`。入队操作在队尾插入新元素，出队操作删除队头的元素。

队列的另外一项重要操作是`读取队头`的元素。这个操作叫做peek()。该操作返回队头元素，但不把它从队列中删除。除了读取队头元素，我们还想知道队列中存储了多少元素，可以使用`length `属性满足该需求；要想清空队列中的所有元素，可以使用`clear() `方法来实现。

<img src="/Users/zhangchaoqun/Library/Application Support/typora-user-images/image-20240919110330546.png" alt="image-20240919110330546" style="zoom:33%;" />

### 实现

1.创建一个类：

```js
class Queue{
	 constructor(items) {
        this.items = items || []
    }
	// 1. 在末尾添加元素
	enqueue(element){
        this.items.push(element)
    }
	// 2. 在头部删除元素
	dequeue(){
        return this.items.shift()
    }
	// 3. 获取头部元素
	front(){
        return this.items[0]
    }
	// 4. 获取队列长度
	get size(){
        return this.items.length
    }
	// 5. 判断是否是空队列
	 get isEmpty(){
        return !this.items.length
    }
	// 6. 清空队列
	clear(){
        this.items = []
    }
}
```

2.使用类：

```js
const queue = new Queue()  // 类的实例化
queue.isEmpty  // true

queue.enqueue('John')   // {items: ['John']}
queue.enqueue('Jack')   // {items: ['John','Jack']}
queue.enqueue('Camila')  // {items: ['John','Jack','Camila']}

queue.size  // 3
queue.isEmpty  // false

queue.dequeue()   // John
queue.dequeue()   // Jack
queue.dequeue()   // Camila
```

### 优先队列

概念：元素的添加和移除是基于优先级的，不在满足完全意义的先进先出。例如机场登机的顺序，头等舱和商务舱乘客的优先级要高于经济舱乘客，这些乘客不需要通过正常排队登机。或是去医院看病，医生也会根据病情程度优先处理病情严重的。

在 Javascript 中实现一个队列类：
1.创建一个类：

```js
class PriorityQueue {
    constructor() {
        this.items = []
    }
    enqueue(element, priority){
        const queueElement = { element, priority }
        if (this.isEmpty) {
            this.items.push(queueElement)
        } else {
// 在列表中找到第一个比后进入的元素的priority大的元素的位置，如果有，将这个元素插入这里。如果没有，将这个元素放在最后面。
            const preIndex = this.items.findIndex((item) => queueElement.priority < item.priority)
            if (preIndex > -1) {
                this.items.splice(preIndex, 0, queueElement)
            } else {
                this.items.push(queueElement)
            }
        }
    }
    dequeue(){
        return this.items.shift()
    }
    front(){
        return this.items[0]
    }
    clear(){
        this.items = []
    }
    get size(){
        return this.items.length
    }
    get isEmpty(){
        return !this.items.length
    }
    print() {
        console.log(this.items)
    }
}

```

2.使用类：

```js
const priorityQueue = new PriorityQueue()
priorityQueue.enqueue('Wangjiajia', 2) // {items: [{element: 'Wangjiajia', priority: 2}]}
priorityQueue.enqueue('Wangtongtong', 1) // {items: [{element: 'Wangtongtong', priority: 1},{element: 'Wangjiajia', priority: 2}]}
priorityQueue.enqueue('Davide', 4)  // {items: [{element: 'Wangtongtong', priority: 1},{element: 'Wangjiajia', priority: 2},{element: 'Davide', priority: 4}]}
priorityQueue.enqueue('Tom', 3)  // {items: [{element: 'Wangtongtong', priority: 1},{element: 'Wangjiajia', priority: 2},{element: 'Tom', priority: 3},{element: 'Davide', priority: 4}]}
priorityQueue.enqueue('James', 2)  // {items: [{element: 'Wangtongtong', priority: 1},{element: 'Wangjiajia', priority: 2},{element: 'James', priority: 2},{element: 'Tom', priority: 3},{element: 'Davide', priority: 4}]}
```

### 循环队列

概念：为充分利用向量空间，克服"假溢出"现象将向量空间想象为一个首尾相接的圆环，并称这种向量为循环向量。存储在其中的队列称为循环队列（Circular Queue）。通俗来说：循环队列是把顺序队列首尾相连，把存储队列元素的表从逻辑上看成一个环，成为循环队列。
假溢出： 队列的空间未利用完,但是却造成了元素的溢出。

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/a850e861b50674f2420e600575863568.png)

基于首次实现的队列类，简单实现一个循环引用的示例：

````js
class LoopQueue extends Queue {
    constructor(items) {
        super(items)
    }
    getIndex(index) {
        const length = this.items.length
        return index > length ? (index % length) : index
    }
    find(index) {
        return !this.isEmpty ? this.items[this.getIndex(index)] : null
    }
}
````

使用：

```js
const loopQueue = new LoopQueue(['Surmon'])
loopQueue.enqueue('SkyRover')
loopQueue.enqueue('Even')
loopQueue.enqueue('Alice')
console.log(loopQueue.size, loopQueue.isEmpty) // 4 false

(loopQueue.find(26) // 'Evan'
(loopQueue.find(87651) // 'Alice'
```

## 4. 栈

#### 操作

`栈`是一种特殊的列表，栈内的元素只能通过列表的一端访问，这一端称为`栈顶`。咖啡厅内的一摞盘子是现实世界中常见的栈的例子。只能从最上面取盘子，盘子洗净后，也只能摞在这一摞盘子的最上面。栈被称为一种`后入先出（LIFO，last-in-first-out）`的数据结构。

由于栈具有后入先出的特点，所以任何不在栈顶的元素都无法访问。为了得到栈底的元素，必须先拿掉上面的元素。对栈的两种主要操作是将一个元素压入栈和将一个元素弹出栈。入栈使用`push() `方法，出栈使用`pop() `方法。另一个常用的操作是预览栈顶的元素。pop() 方法虽然可以访问栈顶的元素，但是调用该方法后，栈顶元素也从栈中被永久性地删除了。`peek() `方法则只返回栈顶元素，而不删除它。

<img src="/Users/zhangchaoqun/Library/Application Support/typora-user-images/image-20240919104502015.png" alt="image-20240919104502015" style="zoom:33%;" />

为了记录栈顶元素的位置，同时也为了标记哪里可以加入新元素，我们使用变量top，当向栈内压入元素时，该变量增大；从栈内弹出元素时，该变量减小。

push()、pop() 和peek() 是栈的3 个主要方法，但是栈还有其他方法和属性。`clear() `方法清除栈内所有元素，`length `属性记录栈内元素的个数。我们还定义了一个`empty `属性，用以表示栈内是否含有元素，不过使用length 属性也可以达到同样的目的。

#### 实现

用javascript基于数组的方法实现一个栈的功能：

```js
class Stack {
    constructor() {
        this.items = []
    }
    // 入栈
    push(element) {
         this.items.push(element)
    }
    // 出栈
    pop() {
        return this.items.pop()
    }
    // 末位
    get peek() {
        return this.items[this.items.length - 1]
    }
    // 是否为空栈
    get isEmpty() {
        return !this.items.length
    }
    // 尺寸
    get size() {
        return this.items.length
    }
    // 清空栈
    clear() {
        this.items = []
    }
    // 打印栈数据
    print() {
        console.log(this.items.toString())
    }
}
```

#### 使用Stack类

```js
// 实例化一个栈
const stack = new Stack()
console.log(stack.isEmpty) // true

// 添加元素
stack.push(5)   // [5]
stack.push(8)   // [5,8]

// 读取属性再添加
console.log(stack.peek) // 8
stack.push(11)  // [5,8,11]
stack.pop()  // 11
console.log(stack.size) // 3
console.log(stack.isEmpty) // false
```

##### 数制间的相互转换

可以利用栈将一个数字从一种数制转换成另一种数制。假设想将数字n 转换为以b 为基数的数字，实现转换的算法如下。

(1) 最高位为n % b，将此位压入栈。

(2) 使用n/b 代替n。

(3) 重复步骤1 和2，直到n 等于0，且没有余数。

(4) 持续将栈内元素弹出，直到栈为空，依次将这些元素排列，就得到转换后数字的字符串形式。

##### 回文

回文是指这样一种现象：一个单词、短语或数字，从前往后写和从后往前写都是一样的。比如，单词“dad”、“racecar”就是回文；如果忽略空格和标点符号，下面这个句子也是回文，“A man, a plan, a canal: Panama”；数字1001 也是回文。

使用栈，可以轻松判断一个字符串是否是回文。我们将拿到的字符串的每个字符按从左至右的顺序压入栈。当字符串中的字符都入栈后，栈内就保存了一个反转后的字符串，最后的字符在栈顶，第一个字符在栈底

字符串完整压入栈内后，通过持续弹出栈中的每个字母就可以得到一个新字符串，该字符串刚好与原来的字符串顺序相反。我们只需要比较这两个字符串即可，如果它们相等，就是一个回文。

##### 递归





## 5. 链表

概念：存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的；每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（指针/链接）组成。
分类：单向链表，双向链表，循环链表
链表和数组的区别：

* 数组在添加或者删除元素的时候需要移动其他元素，链表不需要。链表需要使用指针，因此使用的时候需要额外注意一下。
* 数组可以访问其中任何一个元素，链表需要从头开始迭代，直到找到所需的元素。

链表：
`概念`：存储有序的元素集合，但`不同于数组，链表中的元素在内存中并不是连续放置的`；每个元素由一个存储`元素本身的节点和一个指向下一个元素的引用（指针/链接）组成`。
`分类`：单向链表，双向链表，循环链表
`链表和数组的区别`：

* 数组在添加或者删除元素的时候需要移动其他元素，链表不需要。链表需要使用指针，因此使用的时候需要额外注意一下。
* 数组可以访问其中任何一个元素，链表需要从头开始迭代，直到找到所需的元素。

**链表的常见方法：**
1、`append(element)`：向列表尾部添加一个新的项
2、`insert(position, element)`：向列表的特定位置插入一个新的项。
3、`remove(element)`：从列表中移除一项。
4、`removeAt(position)`：从列表的特定位置移除一项。
5、`indexOf(element)`：返回元素在列表中的索引。如果列表中没有该元素则返回-1。
6、`getElementAt(index)`: 返回链表中特定位置的元素, 如果不存在这样的元素则返回undefined
7、`isEmpty()`：如果链表中不包含任何元素，返回true，如果链表长度大于0则返回false。
8、`size()`：返回链表包含的元素个数。与数组的length属性类似。
9、`toString()`：由于列表项使用了Node类，就需要重写继承自JavaScript对象默认的toString方法，让其只输出元素的值element。

`整体操作方法和数组非常类似, 因为链表本身就是一种可以代替数组的结构.`
`使用javascript描述一个单向链表`：

### 单向链表

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/93d49636180538180a0bfe85e5a85069.png)

生活中的例子：火车就可以看做链表，每一节都是由一节车厢和车厢之间的连接带组成，这个连接带就可以看成是指针。
<img src="https://i-blog.csdnimg.cn/blog_migrate/d7d527b861d9fec5f98d84f15cc0594b.png" alt="在这里插入图片描述" style="zoom: 50%;" />

**用javascript来描述一个单向链表：**

```js
// 链表节点
class Node {
    constructor(element) {
        this.element = element
        this.next = null
    }
}

// 单向链表
class LinkedList {
    constructor() {
        this.head = null
        this.length = 0
    }

    // 1. 追加元素
    // 向链表尾部追加数据可能有两种情况:
	// 链表本身为空, 新添加的数据是唯一的节点.
	// 链表不为空, 需要向其他节点后面追加节点.
    append(element) {
        const node = new Node(element)
        let current = null
        // 链表本身为空, 新添加的数据是唯一的节点.
        if (this.head === null) {
            this.head = node
        } else {
       		// 链表不为空, 需要向其他节点后面追加节点.
            current = this.head
            while(current.next) {
                current = current.next
            }
            current.next = node
        }
        this.length++
    }

    // 2. 任意位置插入元素
    insert(position, element) {
        // 1.检测越界问题: 越界插入失败, 返回false
    	if (position < 0 || position > this.length) return false

	    // 2.找到正确的位置, 并且插入数据
	    // 定义要插入的变量newNode, current当前节点, previous上一个节点
	    let newNode = new Node(element)
	    let current = this.head // 初始值为head, 对第一个元素的引用
	    let previous = null // 存储当前current的上一个节点
	    let index = 0  // 位置
	
	    // 3.判断是否列表是否在第一个位置插入
	    if (position == 0) {
	        newNode.next = current
	        this.head = newNode
	    } else {
	        while (index++ < position) { // 向前赶, 直到找到当前位置position
	            previous = current
	            current = current.next
	        }
	        // index === position, 找到要插入的位置
	        newNode.next = current
	        previous.next = newNode
	    }
	    
	    // 4.length+1
	    this.length++
    }

    // 3. 从链表中任意移除一项
    removeAny(position) {
         //边界检查，越界返回false
        if(position < 0 || position > this.length-1){
            return false
        }
         let current = this.head
         let previous = null
         let index = 0
         // 如果删除第一个元素
         if(position == 0){
			this.head = current.next
		 }else{
		 	// 不是删除第一个找到删除的位置
			while(index++ < position){
				previous = current
				current = current.next
			}
			previous.next = current.next
		}
        this.length--
        return current.element
    }

    // 4. 寻找元素下标
    findIndex(element) {
        let current = this.head
        let index = 0
        //遍历链表直到找到data匹配的position
        while (current) {
            if (element === current.element) {
                return index
            }
            current = current.next
            index++
        }
        return false
    }

    // 5. 从链表的特定位置移除一项。
    remove(element) {
        const index = this.indexOf(element)
        return this.removeAt(index)
    }

	// 6. 判断是否为空链表
    isEmpty() {
        return !this.length
    }

	// 7. 获取链表长度
    size() {
        return this.length
    }

    // 8. 转为字符串
    toString() {
        let current = this.head
        let str = ''
        while (current) {
            str += ` ${current.element}`
            current = current.next
        }
        return str
    }
}
```

链表类的使用：

```js
const linkedList = new LinkedList()

console.log(linkedList)  //  LinkedList {head: null, length: 0}
// 1. 在末尾追加元素
linkedList.append(2)  // LinkedList {head: {element:2,next:null}, length: 1}
linkedList.append(4)  // LinkedList {head: {element:2,next:{element:4,next:null}}, length: 2}
linkedList.append(6) // LinkedList {head: {element:2,next:{element:4,next:{element:6,next:null}}}, length: 3}

// 2. 在任意位置插入一个元素
linkedList.insert(2, 18) // LinkedList {head: {element:2,next:{element:4,next:{element:18,next:{element:6,next:null}}}}, length: 4}

// 3. 从链表中任意位置删除一项
linkedList.removeAny(2) // 18

// 4. 寻找元素下标
linkedList.findIndex(6)  // 2
linkedList.findIndex(18)  // false
linkedList.findIndex(20)  // false

// 5. 从链表的特定位置移除一项。
linkedList.remove(4)

// 6. 判断是否为空链表
linkedList.isEmpty()  // false

// 7. 获取链表长度
linkedList.size()  // 2

// 8. 转为字符串
linkedList.toString()  // ' 2 4 18 6'
```

### 双向链表

`概念：`双向链表和普通链表的区别在于，在链表中， 一个节点只有链向下一个节点的链接，而在双向链表中，链接是双向的：一个链向下一个元素， 另一个链向前一个元素，如下图所示：
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/6457f916dc820e5a589f17ea37b15a69.png)
使用javacsript来实现一个双向链表类：

```js
class Node{
	constructor(element){
		this.element = element
		this.next = null 
		this.prev = null 
	}
}

// 双向链表
class DoublyLinkedList {
    constructor() { 
        this.head = null
        this.tail = null
        this.length = 0
    }

	// 1. 任意位置插入
	insert(position,element){
		// 1.1 检测越界问题: 越界插入失败, 返回false
    	if (position < 0 || position > this.length) return false
    	let newNode = new Node(element)
	    let current = this.head // 初始值为head, 对第一个元素的引用
	    let previous = null // 存储当前current的上一个节点
	    let index = 0  // 位置
	    // 1.2 如果插在了首位
	    if(position == 0){
			// 空链表
			if(!head){
				this.head = node 
				this.tail = node 
			}else{
				this.head = node
				node.next = current
				current.prev = node
			}
		}
		// 1.3 如果插在了末位
		else if(position == this.length) {
			this.tail = node
			current.next = node
            node.prev = current
		}else {
			// 如果插在了中间位置
			// 找到插入的位置
			while(idex++ < position){
				previous = current
	            current = current.next
			}
			// 插入进去
			node.next = current
            previous.next = node
            node.pre = previous
            current.pre = node
			this.length++
            return true
		}
	}
	
	// 2. 移除任意位置元素
	removeAny(position){
		// 2.1 边界检查，越界返回false
		if(position < 0 || position > this.length-1) return false
		let current = this.head
        let previous = null
        let index = 0
		// 2.2 如果删除的是首位
		if(position == 0){
			this.head = current.next
			this.head.prev = null
		}else if(position == this.length - 1){
			// 2.3 如果删除的是末位
			this.tail = current.pre
			this.tail.next = null 
		}else {
			// 2.4 中间项
			// 找到删除的位置
			while(index++ < position){
				previous = current
				current = current.next
			}
			previous.next = current.next
			current.prev = current.next.prev
			this.length--
         	return current.element
		}
	} 
}
```

### 循环链表

`概念`：循环链表可以像单向链表一样只有单向引用，也可以向双向链表一样具有双向引用。
`单向循环链表`：最后一个元素指向下一个元素的指针(tail.next)不是引用null， 而是指向第一个元素(head)，如下图所示：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/6400bc435541622b6a90660fb7224e53.png)

`双向循环链表`：最后一个元素指向下一个元素的指针tail.next不是nul，而是指向第一个元素（head），同时第一个元素指向前一个元素的指针head.prev不是null，而是最后一个元素tail。如图所示：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/176f11a1015e10e58298814710c2fbf6.png)

链表的优势：无需移动链表中的元素，就能轻松地添加和移除元素。因此，当你需要添加和移除很多元素 时，最好的选择就是链表，而非数组。

## 6. 集合

`集合（set）是一种包含不同元素的数据结构。集合中的元素称为成员。集合的两个最重要特性是：首先，集合中的成员是无序的；其次，集合中不允许相同成员存在。集合在计算机科学中扮演了非常重要的角色，然而在很多编程语言中，并不把集合当成一种数据类型。当你想要创建一个数据结构，用来保存一些独一无二的元素时，比如一段文本中用到的单词，集合就变得非常有用。本章讨论如何在JavaScript 中创建Set 类。

### 定义

集合是由一组无序但彼此之间又有一定相关性的成员构成的，每个成员在集合中只能出现一次。在数学上，用大括号将一组成员括起来表示集合，比如{0,1,2,3,4,5,6,7,8,9}。集合中成员的顺序是任意的，因此前面的集合也可以写做{9,0,8,1,7,2,6,3,5,4}，或者其他任意形式的组合，但是必须保证每个成员只能出现一次。

- 不包含任何成员的集合称为空集，全集则是包含一切可能成员的集合。
- 如果两个集合的成员完全相同，则称两个集合相等。
- 如果一个集合中所有的成员都属于另外一个集合，则前一集合称为后一集合的子集。

`概念`：集合是由一组无序且唯一（不能重复）的项组成的。目前在ES6中已经内置了Set的实现。
`集合中常用的一些方法`：
add() 添加元素
delete() 删除元素，返回布尔值，删除成功返回true,删除失败返回false
has() 判断是否含有某个元素，返回布尔值
clear() 清空set数据结构
size 没有括号，返回此结构长度

**在ES6中使用集合：**

````js
const arr = [1,2,2,3,3,3,4,4,5]
const str = 'wangjiajiawwwjiajiawwwww'
// 1.添加元素
new Set(arr)   // Set{1,2,3,4,5}
new Set(str )    // Set{'w', 'a', 'n', 'g', 'j', 'i'}
new Set(arr).add(8)    // Set{1,2,3,4,5,8}

// 2.删除元素 
new Set(arr).delete(2)    // true
new Set(arr).delete(9)    // false

// 3.判断是否含有某个元素
new Set(arr).has(2)    // true
new Set(arr).has(9)    // false

// 4.清空set数据结构
new Set(arr).clear()  // undefined

// 5.没有括号，返回此结构长度
new Set(arr).size    // 5
````

**在javascript中使用集合：**

```js
// hasOwnProperty(propertyName)方法 是用来检测属性是否为对象的自有属性，如果是，返回true，否则返回false; 参数propertyName指要检测的属性名；
// hasOwnProperty() 方法是 Object 的原型方法（也称实例方法），它定义在 Object.prototype 对象之上，所有 Object 的实例对象都会继承 hasOwnProperty() 方法。
class Set {
    constructor() {
        this.items = {}
    }

    has(value) {
        return this.items.hasOwnProperty(value)
    }

    add(value) {
        if (!this.has(value)) {
            this.items[value] = value
            return true
        }     
        return false
    }

    remove(value) {
        if (this.has(value)) {
            delete this.items[value]
            return true
        }
        return false
    }

    get size() {
        return Object.keys(this.items).length
    }

    get values() {
        return Object.keys(this.items)
    }
}
```



```js
const set = new Set()
set.add(1)
console.log(set.values)  // ["1"] 
console.log(set.has(1))  // true 
console.log(set.size) // 1 
set.add(2) 
console.log(set.values)  // ["1", "2"] 
console.log(set.has(2))  // true 
console.log(set.size) // 2 
set.remove(1) 
console.log(set.values) // ["2"] 
console.log(set.has(1))  // false
set.remove(2) 
console.log(set.values) // []
```

**对集合可以执行如下操作：**
`并集`：对于给定的两个集合，返回一个包含两个集合中所有元素的新集合。
`交集`：对于给定的两个集合，返回一个包含两个集合中共有元素的新集合。
`补集`：对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合。

### 并集

并集的数学概念：集合A和B的并集，表示为A∪B，定义如下：A∪B = { x | x∈A V x∈B }，意思是x（元素）存在于A中，或x存在于B中。如图：
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/d44c4c131941c92a5f8f6bff6e42205e.png)
基于刚才的 Set 类实现一个并集方法：

```js
union(otherSet) {
    const unionSet = new Set()
    // 先添加其中一个集合的元素放在unionSet中
    this.values.forEach((v, i) => unionSet.add(this.values[i]))
    // 在把另一个集合的元素放入unionSet中
    otherSet.values.forEach((v, i) => unionSet.add(otherSet.values[i]))
    return unionSet
}
```

### 交集

并集的数学概念：集合A和B的交集，表示为A∩B，定义如下：A∩B = { x | x∈A ∧ x∈B }，意思是x（元素）存在于A中，且x存在于B中。如图：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/12fb77f475fb5fa77d591c05b30740a3.png)
基于刚才的 Set 类实现一个交集方法：

```js
intersection(otherSet) {
    const intersectionSet = new Set()
    // 从集合A开始循环判断，如果这个元素也在集合B中，那就说明这个元素是集合A,B公有的。这时候把这个元素放到一个新的集合中
    this.values.forEach((v, i) => {
        if (otherSet.has(v)) {
            intersectionSet.add(v)
        }
    })
    return intersectionSet
}
```

### 差集

差集的数学概念：集合A和B的差集，表示为A-B，定义如下：A-B = { x | x∈A ∧ x∉B }，意思是x（元素）存在于A中，且不x存在于B中。如图：
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/20bc62f78fe6995682b2b118a224995e.png)
基于刚才的 Set 类实现一个差集 A-B 的方法：

```js
difference(otherSet) {
	// 从集合A开始循环判断，如果这个元素不在集合B中。说明这个元素是A私有的，此时把这个元素放入一个新的集合中。
    const differenceSet = new Set()
    this.values.forEach((v, i) => {
        if (!otherSet.has(v)) {
            differenceSet.add(v)
        }
    })
    return differenceSet
}
```

### 子集

子集的数学概念：集合A是B的子集，或者说集合B包含了集合A，如图：
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/2549f9aaaf93e42b0790db162e1cccbd.png)
基于刚才的 Set 类实现一个子集方法：

```js
// 在这里this代表集合A，otherSet代表集合B
subset(otherSet){
	if(this.size > otherSet.size){
		return false
	}else{
		// 只要A里面有一个元素不在B里面就说明A不是B的子集，后面元素不用在判断了
		this.values.every(v => !otherSet.has(v))
	}
}
```

## 7. 字典

集合、字典、散列表都可以存储不重复的数据。字典以键值对的形式存储数据，类似于javascript中的Object对象。

字典是一种以键- 值对形式存储数据的数据结构，就像电话号码簿里的名字和电话号码一样。要找一个电话时，先找名字，名字找到了，紧挨着它的电话号码也就找到了。这里的键是指你用来查找的东西，值是查找得到的结果。

JavaScript 的Object 类就是以字典的形式设计的。本章将使用Object 类本身的特性，实现一个Dictionary 类，让这种字典类型的对象使用起来更加简单。你也可以只使用数组和对象来实现本章展示的方法，但是定义一个Dictionary 类更方便，也更有意思。比如，使用() 引用键就比使用[] 简单。

**在javascript中实现字典：**

```js
class Dictionary {
    constructor() {
        this.items = {}
    }

    set(key, value) {
        this.items[key] = value
    }

    get(key) {
        return this.items[key]
    }

    remove(key) {
        delete this.items[key]
    }

    get keys() {
        return Object.keys(this.items)
    }

    get values() {
        /*
        也可以使用ES7中的values方法
        return Object.values(this.items)
        */

        // 在这里我们通过循环生成一个数组并输出
        return Object.keys(this.items).reduce((r, c, i) => {
            r.push(this.items[c])
            return r
        }, [])
    }
}
```

**使用字典：**

```js
const dictionary = new Dictionary()
dictionary.set('Wangjiajia', 'Wangjiajia@email.com')
dictionary.set('Wangtongtong', 'Wangtongtong@email.com')
dictionary.set('davide', 'davide@email.com') 

console.log(dictionary)  // {items:{'Wangjiajia', 'Wangjiajia@email.com','Wangtongtong', 'Wangtongtong@email.com','davide', 'davide@email.com'}}
console.log(dictionary.keys)  // ['Wangjiajia','Wangtongtong','davide']
console.log(dictionary.values) // [Wangjiajia@email.com','Wangtongtong@email.com','davide@email.com']
console.log(dictionary.items)  // {'Wangjiajia': 'Wangjiajia@email.com','Wangtongtong': 'Wangtongtong@email.com','davide':'davide@email.com'}
```

## 8. 散列表或哈希表

`散列`是一种常用的数据存储技术，散列后的数据可以`快速地插入或取用`。散列使用的数据结构叫做`散列表`。在散列表上插入、删除和取用数据都非常快，但是对于查找操作来说却效率低下，比如查找一组数据中的最大值和最小值。这些操作得求助于其他数据结构，二叉查找树就是一个很好的选择。

我们的散列表是基于数组进行设计的。数组的长度是预先设定的，如有需要，可以随时增加。所有元素根据和该元素对应的键，保存在数组的特定位置，该键和我们前面讲到的字典中的键是类似的概念。使用散列表存储数据时，通过一个`散列函数`将键映射为一个数字，这个数字的范围是0 到散列表的长度。

理想情况下，散列函数会将每个键值映射为一个唯一的数组索引。然而，键的数量是无限的，数组的长度是有限的（理论上，在JavaScript 中是这样），一个更现实的目标是让散列函数尽量`将键均匀地映射到数组中`。

即使使用一个高效的散列函数，仍然存在将两个键映射成同一个值的可能，这种现象称为`碰撞（collision）`。

要确定的最后一个问题是：散列表中的数组究竟应该有多大？这是编写散列函数时必须要考虑的。对数组大小常见的限制是：数组长度应该是一个`质数`。在实现各种散列函数时，我们将讨论为什么要求数组长度为质数。之后，会有多种确定数组大小的策略，所有的策略都基于处理碰撞的技术。

<img src="/Users/zhangchaoqun/Library/Application Support/typora-user-images/image-20240919111824827.png" alt="image-20240919111824827" style="zoom:33%;" />

### HashTable类

我们使用一个类来表示散列表，该类包含计算散列值的方法、向散列中插入数据的方法、从散列表中读取数据的方法、显示散列表中数据分布的方法，以及其他一些可能会用到的工具方法。

```js
function HashTable() {
  this.table = new Array(137);
  this.simpleHash = simpleHash;
  this.showDistro = showDistro;
  this.put = put;
  //this.get = get;
}
```

散列函数的选择依赖于键值的数据类型。如果键是整型，最简单的散列函数就是以数组的长度对键取余。在一些情况下，比如数组的长度是10，而键值都是10 的倍数时，就不推荐使用这种方式了。这也是数组的长度为什么要是质数的原因之一，就像我们在上个构造函数中，设定数组长度为137 一样。如果键是随机的整数，则散列函数应该更均匀地分布这些键。这种散列方式称为除留余数法。

将字符串中每个字符的ASCII 码值相加

一样的散列值引发了碰撞

为了避免碰撞，首先要确保散列表中用来存储数据的数组其大小是个质数。这一点很关键，这和计算散列值时使用的取余运算有关。数组的长度应该在100 以上，这是为了让数据在散列表中分布得更加均匀。通过试验我们发现，比100 大且不会让例8-1 中的数据产生碰撞的第一个质数是137。

霍纳算法

新的散列函数仍然先计算字符串中各字符的ASCII 码值，不过求和时每次要乘以一个质数。大多数算法书建议使用一个较小的质数，比如31，但是对于我们的数据集，31 不起作用，我们使用37，这样刚好不会产生碰撞。

### 碰撞处理

当散列函数对于多个输入产生同样的输出时，就产生了碰撞。

#### 开链法

当碰撞发生时，我们仍然希望将键存储到通过散列算法产生的索引位置上，但实际上，不可能将多份数据存储到一个数组单元中。开链法是指实现散列表的底层数组中，每个数组元素又是一个新的数据结构，比如另一个数组，这样就能存储多个键了。使用这种技术，即使两个键散列后的值相同，依然被保存在同样的位置，只不过它们在第二个数组中的位置不一样罢了。

<img src="/Users/zhangchaoqun/Library/Application Support/typora-user-images/image-20240919131418146.png" alt="image-20240919131418146" style="zoom:33%;" />

实现开链法的方法是：在创建存储散列过的键值的数组时，通过调用一个函数创建一个新的空数组，然后将该数组赋给散列表里的每个数组元素。这样就创建了一个二维数组

#### 线性探测法

第二种处理碰撞的方法是线性探测法。线性探测法隶属于一种更一般化的散列技术：开放寻址散列。当发生碰撞时，线性探测法检查散列表中的下一个位置是否为空。如果为空，就将数据存入该位置；如果不为空，则继续检查下一个位置，直到找到一个空的位置为止。该技术是基于这样一个事实：每个散列表都会有很多空的单元格，可以使用它们来存储数据。

当存储数据使用的数组特别大时，选择线性探测法要比开链法好。这里有一个公式，常常可以帮助我们选择使用哪种碰撞解决办法：如果数组的大小是待存储数据个数的1.5 倍，那么使用开链法；如果数组的大小是待存储数据的两倍及两倍以上时，那么使用线性探测法。

------

`根据关键码值(Key value)而直接进行访问的数据结构。`通过把关键码值映射到表中某个位置来访问记录，以加快查找的速度。这个映射函数叫做散列函数，存放记录的数组叫散列表。
`给定表M，存在函数f(key)，对任意给定的关键字值key，代入函数后若能得到包含该关键字的记录在表中的地址，则称表M为哈希(Hash）表，函数f(key)为哈希(Hash) 函数。`
哈希表示意图：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/b11bd7c33587dd14bf0f400d254fd879.png)

`哈希表冲突`：当通过哈希函数取得一个哈希值时，很有可能这个值的下标所处的位置上已经存放过数据，这时候便出现冲突。
`解决冲突`：链地址法、开放地址法。

**在javascript中实现哈希表：**

```js
function HashTable(){
	// 初始化哈希列表
	// 1. 设置哈希表数组
	this.item = []
	// 2. 设置哈希表长度
	this.limit = 10
	// 3. 设置表中数据量
	this.total = 0

	// 设置哈希函数
	HashTable.prototype.hashFunc = function(key, limit){
		let keyvalue = 0
        for(let i=0; i<key.length; i++){
            keyvalue=keyvalue * 12 + key.charCodeAt(i)
        }
        //使用取余运算计算hashCode
	    return keyvalue%limit
	}

	// 增、改
	 HashTable.prototype.put = function(key, value){
		// 根据hashCode找到对应下标修改或者添加数据
        let index = this.hashFunc(key, this.limit)
        let arr = this.item[index]
        // 如果这个下标所处的位置已经存放过数据，即arr有值，此时存在哈希表冲突
        if(arr){
			let completed = false
            // 遍历数组，如果发现重名数据则直接修改
            arr.forEach(item=>{
                if(key===item[0]){
                    completed = true
                    return item[1] = value
                }
            })
            // 如果没有重名则在末尾添加新数据
            if(!completed){
				arr.push([key, value])
                this.total++
			}
		}else{
            //如果basket为null则重新创建数组
            this.item[index] = [[key, value]]
            this.total++
        }
	}
	// 查
	HashTable.prototype.get = function(key){
        let index = this.hashFunc(key, this.limit)
        let basket = this.item[index]
        //如果basket为null则没有对应数据
        if(basket===undefined){
            return null
        }else{
            //如果有basket, 则遍历basket，遍历完没有对应key则不存在对应数据
            for(let i = 0; i < basket.length; i++){
                if(key===basket[i][0]) return basket[i][1]
            }
            return null
        }
    }
    // 删
    HashTable.prototype.remove = function(key){
        let index = this.hashFunc(key, this.limit)
        let basket = this.item[index]
        //如果basket为null则没有对应数据
        if(!basket){
            return null
        }else{
            //如果有basket, 则遍历basket，遍历完没有对应key则不存在对应数据
            for(let i = 0; i < basket.length; i++){
                if(key===basket[i][0]){
                    this.total--
                    return basket.splice(i, 1)
                }
            }
            return null
        }
    }
	//求表长
    HashTable.prototype.size = function(){
        return this.total
    }
 
    //判断表空
    HashTable.prototype.isEmpty = function(){
        return this.total===0
    }
}

```

## 9. 树

树是计算机科学中经常用到的一种数据结构。树是一种非线性的数据结构，以分层的方式存储数据。树被用来存储具有层级关系的数据，比如文件系统中的文件；树还被用来存储有序列表。本章将研究一种特殊的树：二叉树。选择树而不是那些基本的数据结构，是因为在二叉树上进行查找非常快（而在链表上查找则不是这样），为二叉树添加或删除元素也非常快（而对数组执行添加或删除操作则不是这样）。

`概念`：是`一种天然具有递归属性的非顺序数据结构，是一种特殊的图（无向无环）`。由n个节点组成，具有一定的层级关系。`有向无环图`。

`度`：最多的叉数

`根结点`：树的最顶端的节点，根节点只有一个

`子节点`：除根节点之外，并且本身下面还连接有节点的节点。

`叶子结点`：自己下面不再连接有节点的节点（即末端），称为叶子节点（又称为终端结点），度为0

`深度`：节点到根结点的节点数量

`高度`：所有节点深度中的最大值

`路径·`：从一个节点到另一个节点的这一组边称为路径

`层数`

`子树`： 

每个节点都有一个与之相关的值，该值有时被称为键

<img src="/Users/zhangchaoqun/Library/Application Support/typora-user-images/image-20240919133946692.png" alt="image-20240919133946692" style="zoom:33%;" />

### 树的分类

#### 普通树

<img src="/Users/zhangchaoqun/Library/Application Support/typora-user-images/image-20240919134009582.png" alt="image-20240919134009582" style="zoom:33%;" />

#### 二叉树

- 树的每个节点最多只能有两个子节点，树的度最多为2

- 二叉树可以为空，也就是没有任何节点，如果不为空它是由左右子树两个不相交的二叉树组成。
- 二叉树每个节点的子节点不允许超过两个。通过将子节点的个数限定为2，可以写出高效的程序在树中插入、查找和删除数据

<img src="/Users/zhangchaoqun/Library/Application Support/typora-user-images/image-20240919133931910.png" alt="image-20240919133931910" style="zoom:33%;" />

#### 二叉搜索树或二叉查找树（BST）

当考虑某种特殊的二叉树，比如二叉查找树时，确定子节点非常重要。二叉查找树是一种特殊的二叉树，相对较小的值保存在左节点中，较大的值保存在右节点中。这一特性使得查找的效率很高，对于数值型和非数值型的数据，比如单词和字符串，都是如此。

- 非空左子树的键值要小于根结点的键值
- 非空右子树的键值要大于根结点的键值
- 左右子树都要是二叉搜索树

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/acbcd53887b72ab730519159dd1976fc.png)

Node 对象既保存数据，也保存和其他节点的链接（left 和right），show() 方法用来显示保存在节点中的数据。

现在可以创建一个类，用来表示二叉查找树（BST）。我们让类只包含一个数据成员：一个表示二叉查找树根节点的Node 对象。该类的构造函数将根节点初始化为null，以此创建一个空节点。

BST 先要有一个insert() 方法，用来向树中加入新节点。这个方法有点复杂，需要着重讲解。

首先要创建一个Node 对象，将数据传入该对象保存。

其次检查BST 是否有根节点，如果没有，那么这是棵新树，该节点就是根节点，这个方法到此也就完成了；否则，进入下一步。

如果待插入节点不是根节点，那么就需要准备遍历BST，找到插入的适当位置。该过程类似于遍历链表。用一个变量存储当前节点，一层层地遍历BST。

进入BST 以后，下一步就要决定将节点放在哪个地方。找到正确的插入点时，会跳出循环。查找正确插入点的算法如下。

(1) 设根节点为当前节点。

(2) 如果待插入节点保存的数据小于当前节点，则设新的当前节点为原节点的左节点；反之，执行第4 步。

(3) 如果当前节点的左节点为null，就将新的节点插入这个位置，退出循环；反之，继续执行下一次循环。

(4) 设新的当前节点为原节点的右节点。

(5) 如果当前节点的右节点为null，就将新的节点插入这个位置，退出循环；反之，继续执行下一次循环。

##### 构建二叉搜索树

```js
var arr = [];

for (var i = 0 ; i < 10000 ; i ++) {
    arr[i] = Math.floor(Math.random() * 10000);
}

function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

var num = 0;
function search(arr, target) {
    for (var i = 0 ; i < arr.length ; i ++) {
        num += 1;
        if (arr[i] == target) return true;
    }
    return false;
}

function addNode(root, num) {
    if (root == null) return;
    if (root.value == num) return;
    if (root.value < num) {//目标值比当前节点大
        if (root.right == null) root.right = new Node(num);//如果右侧为空，则创建节点
        else addNode(root.right, num);//如果右侧不为空，则向右侧进行递归
    } else {//目标值比当前节点小
        if (root.left == null) root.left = new Node(num);
        else addNode(root.left, num);
    }
}

function buildSearchTree(arr) {
    if (arr == null || arr.length == 0) return null;
    var root = new Node(arr[0]);
    for (var i = 1 ; i < arr.length ; i ++) {
        addNode(root, arr[i]);
    }
    return root;
}

var num2 = 0;
function searchByTree(root, target) {
    if (root == null) return false;
    num2 += 1;
    if (root.value == target) return true;
    if (root.value > target) return searchByTree(root.left, target);
    else return searchByTree(root.right, target);
}

console.log(search(arr, 1000));
console.log(num);

var root = buildSearchTree(arr);

console.log(searchByTree(root, 1000));
console.log(num2);
```



#### 满二叉树与完全二叉树

`满二叉树`是每一个非叶子节点都有两个子节点，所有叶子节点都在最底层，左右子树呈对称趋势。

`完全二叉树`

国内定义：1.叶子节点都在最后一层或者倒数第二层  2.叶子节点都向左聚拢

国际定义：1.叶子节点都在最后一层或者倒数第二层  2.叶子节点必然是零个或两个

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/65ca36d9c8bf76cb23d60359ef272f8b.png)

#### 平衡二叉树

优化版二叉搜索树

1. 根节点的左子树和右子树的高度差不能超过1
2. 每个子树都符合第一条

```js
function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

var a = new Node("a");
var b = new Node("b");
var c = new Node("c");
var d = new Node("d");
var e = new Node("e");
var f = new Node("f");
var g = new Node("g");
var h = new Node("h");
var j = new Node("j");

a.left = b;
a.right = c;
b.left = d;
// b.right = e;
c.left = f;
c.right = g;
d.right = h;
// e.right = j;

function getDeep(root) {
    if (root == null) return 0;
    var leftDeep = getDeep(root.left);
    var rightDeep = getDeep(root.right);
    return Math.max(leftDeep, rightDeep) + 1;
}

function isBalance(root) {
    if (root == null) return true;
    var leftDeep = getDeep(root.left);
    var rightDeep = getDeep(root.right);
    if (Math.abs(leftDeep - rightDeep) > 1) {//不平衡
        return false;
    } else {
        return isBalance(root.left) && isBalance(root.right);
    }
}

console.log(isBalance(b));
```



#### 红黑树

**问题**：`有一万个数，查找给定数返回存在与否，要求尽可能性能好`

`数组`--->`二叉树`--->`二叉搜索树`--->`平衡二叉树`--->`二叉树的单旋双旋`--->`红黑树`

二叉平衡排序树不是性能的极致，只有两个叉，节点铺满也有很多层，希望一个节点存多个数，提升空间性能，树的层级越少，查找效率越高

234树，最多有四个叉，永远平衡，每个路径高度相同，分支变多层数变少，节点中存的数变多，节点变少，但是复杂度上升了，依旧是二叉树、依旧多叉、单节点依旧存放多个值

`红黑二叉树本质上就是一种二叉搜索树`，在插入和删除等操作的时候通过特定操作保持二叉树的平衡。`红黑二叉树本身是复杂的`，但它的最坏情况运行时间也是非常良好的，并且在实践中是高效的：它可以在O(log n)时间内做查找，插入和删除，这里的 n 是树中元素的数目。
红黑二叉树在二叉搜索树的基础上必须满足以下要求：

- 节点必须是红色的或者黑色的(红色代表节点为虚拟节点，无意义节点，和下一层节点组合才有意义)

- 根结点必须是黑色的
- 如果节点是红色的，那么他的子节点必须是黑色的（反之未必）
- 从根节点到任意一个叶子结点不能有两个连续的红色节点
- 从任意节点开始到他的每一个叶子节点，所有路线上的黑色节点数目相同

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/677fba5c3b4b4aa2a3c438e7063027ff.png)

**用javascript实现二叉树的一些操作：**

```js
// 封装二叉树节点
class Node {
  constructor(data){
    this.data = data
    this.left = null
    this.right = null
  }
}

// 封装二叉搜索树
class BinarySearchTree {
  constructor(){
    this.root = null  // 定义二叉树根节点
  }

  // 插入节点
  insert(key){
    const newNode = new Node(key)
    // 定义插入节点的函数，比根节点小的放左边，比根节点大的放右边
    function insertNode(node, newNode){
      if(newNode.key < node.key){
        // 判断根节点的左侧是否有节点，如果没有节点则直接插入，如果有节点则递归执行insertNode函数
        if(node.left == null){
          node.left = newNode
        }else{
          insertNode(node.left, newNode)
        }
      }else{
        // 判断根节点的右侧是否有节点，如果没有节点则直接插入，如果有节点则递归执行insertNode函数
        if(node.right == null){
          node,right = newNode
        }else{
          insertNode(node.right, newNode)
        }
      }
    }
    // 如果是空二叉树，则插入的节点就是根节点，否则正常插入
    if(!this.root){
      this.root = newNode
    }else{
      insertNode(this.root, newNode)
    }
  }
}

```

**二叉搜索树类的使用：**

```js
const tree = new BinarySearchTree()
tree.insert(11)
tree.insert(7)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(15)
tree.insert(13)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(25)
```

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/b0cf9c6a959a240d1e98bbd636ccfd83.png)

### 树的算法

#### 二叉树的遍历

访问树的每一个节点并对他们进行某种操作的过程

- `前序遍历`：先访问根节点，再访问左节点，最后访问右节点（左右子树同样进行该操作，根左右）
- `中序遍历`：先访问左节点，再访问根节点，最后访问右结点，（左根右）
- `后序遍历`：先访问左节点，再访问右节点，最后访问根节点。（左右根）

##### 前序遍历

根-左-右

```js
function preorder(root){
  // 排除根节点为空的情况
  if(!root) return
  // 1. 访问根节点
  console.log(root.key)  // 11 7 5 3 6 9 8 10 15 13 12 14 20 18 25
  // 2. 递归对根节点的左子树进行先序遍历
  preorder(root.left)
    // 3. 递归对根节点的右子树进行先序遍历
  preorder(root.right)
}
preorder(tree)
```

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/f23466240c15faa47634d8a8b65d3f19.png)

##### 中序遍历

左-根-右

```js
const inorder = (root) => {
	if(!root) return
	// 1. 递归对根节点的左子树进行中序遍历
	inorder(root.left)
	// 2. 访问根节点
	console.log(root.key)  // 3 5 6 7 8 9 10 11 12 13 14 15 18 20 25
	// 3. 递归对根节点的右子树进行中序遍历
	inorder(root.right)
}
inorder(tree)
```

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/8493c6fec89ee0b27aabe4236ea11ac6.png)

##### 后序遍历

左-右-根

```js
const postorder = (root) => {
	if (!root) return
	// 1. 递归对根节点的左子树进行后序遍历
	postorder(root.left)
	// 2. 递归对根节点的左子树进行后序遍历
	postorder(root.right)
	// 3. 访问根节点
	console.log(root.key)  // 3 6 5 8 10 9 7 12 14 13 18 25 20 15 11
}
postorder(tree)
```

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/194be3a93747ba659f7c18a09775237b.png)

#### 二叉树的比较

```js
function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

var a1 = new Node("a");
var b1 = new Node("b");
var c1 = new Node("c");
var d1 = new Node("d");
var e1 = new Node("e");
var f1 = new Node("f");
var g1 = new Node("g");

a1.left = c1;
a1.right = b1;
c1.left = f1;
// c1.right = g1;
b1.left = d1;
b1.right = e1;

var a2 = new Node("a");
var b2 = new Node("b");
var c2 = new Node("c");
var d2 = new Node("d");
var e2 = new Node("e");
var f2 = new Node("f");
var g2 = new Node("g");

a2.left = c2;
a2.right = b2;
c2.left = f2;
// c2.right = g2;
b2.left = d2;
b2.right = e2;

function compareTree(root1, root2) {
    if (root1 == root2) return true;//是同一个颗树
    if (root1 == null && root2 != null || root2 == null && root1 != null) return false;//其中一个为空，另一个不为空
    if (root1.value != root2.value) return false;//相同位置的值不相等
    var leftBool = compareTree(root1.left, root2.left);//判断左子树是否相等
    var rightBool = compareTree(root1.right, root2.right);//判断右子树是否相等
    return leftBool && rightBool;//必须左右子树都相等才算相等
}

console.log(compareTree(a1, a2));
```



##### 左右子树互换后的比较

```js
function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

var a1 = new Node("a");
var b1 = new Node("b");
var c1 = new Node("c");
var d1 = new Node("d");
var e1 = new Node("e");
var f1 = new Node("f");
var g1 = new Node("g");

a1.left = c1;
a1.right = b1;
c1.left = f1;
c1.right = g1;
b1.left = d1;
b1.right = e1;

var a2 = new Node("a");
var b2 = new Node("b");
var c2 = new Node("c");
var d2 = new Node("d");
var e2 = new Node("e");
var f2 = new Node("f");
var g2 = new Node("g");

a2.right = c2;
a2.left = b2;
c2.left = f2;
c2.right = g2;
b2.left = d2;
b2.right = e2;

function compareTree(root1, root2) {
    if (root1 == root2) return true;//是同一个颗树
    if (root1 == null && root2 != null || root2 == null && root1 != null) return false;//其中一个为空，另一个不为空
    if (root1.value != root2.value) return false;//相同位置的值不相等
    return compareTree(root1.left, root2.left) && compareTree(root1.right, root2.right)
    || compareTree(root1.left, root2.right) && compareTree(root1.right, root2.left);
}

console.log(compareTree(a1, a2));
```



##### 二叉树的DIFF算法

```js
//新增了什么，修改了什么，删除了什么

// {type: "新增", origin: null, now: c2},
// {type: "修改", origin: c1, now: c2},
// {type: "删除", origin: c2, now: null }
// var diffList = [];

function diffTree(root1, root2, diffList) {
    if (root1 == root2) return diffList;
    if (root1 == null && root2 != null) {// 新增了节点
        diffList.push({type: "新增", origin: null, now: root2});
    } else if (root1 != null && root2 == null) {// 删除了节点
        diffList.push({type: "删除", origin: root1, now: null});
    } else if (root1.value != root2.value) {//相同位置的节点值不同了，修改了节点
        diffList.push({type: "修改", origin: root1, now: root2});
        diffTree(root1.left, root2.left, diffList);
        diffTree(root1.right, root2.right, diffList);
    } else {
        diffTree(root1.left, root2.left, diffList);
        diffTree(root1.right, root2.right, diffList);
    }
}
var diffList = [];
diffTree(a1, a2, diffList);
console.log(diffList);
```



#### 二叉树的搜索

##### 树的深度优先搜索

```js
function Node(value) {
    this.value = value;
    this.neighbor = [];
}

var a = new Node("a");
var b = new Node("b");
var c = new Node("c");
var d = new Node("d");
var e = new Node("e");

a.neighbor.push(b);
a.neighbor.push(c);
b.neighbor.push(a);
b.neighbor.push(c);
b.neighbor.push(d);
c.neighbor.push(a);
c.neighbor.push(b);
c.neighbor.push(d);
d.neighbor.push(b);
d.neighbor.push(c);
d.neighbor.push(e);
e.neighbor.push(d);

function deepSearch(node, target, path) {
    if (node == null) return false;
    if (path.indexOf(node) > -1) return false;
    if (node.value == target) return true;
    path.push(node);
    var result = false;
    for (var i = 0 ; i < node.neighbor.length ; i ++) {
        result |= deepSearch(node.neighbor[i], target, path);
    }
    return result ? true : false;
}

console.log(deepSearch(b, "n", []));
```



##### 树的广度优先搜索

```js
function Node(value) {
    this.value = value;
    this.neighbor = [];
}

var a = new Node("a");
var b = new Node("b");
var c = new Node("c");
var d = new Node("d");
var e = new Node("e");

a.neighbor.push(b);
a.neighbor.push(c);
b.neighbor.push(a);
b.neighbor.push(c);
b.neighbor.push(d);
c.neighbor.push(a);
c.neighbor.push(b);
c.neighbor.push(d);
d.neighbor.push(b);
d.neighbor.push(c);
d.neighbor.push(e);
e.neighbor.push(d);

function bfs(nodes, target, path) {
    if (nodes == null || nodes.length == 0) return false;
    var nextNodes = [];
    for (var i = 0 ; i < nodes.length ; i ++) {
        if (path.indexOf(nodes[i]) > -1) continue;
        path.push(nodes[i]);
        if (nodes[i].value == target) return true;
        else nextNodes = nextNodes.concat(nodes[i].neighbor);
    }
    return bfs(nextNodes, target, path);
}

console.log(bfs([c], "n", []));
```



##### 搜索最小值和最大值

查找BST 上的最小值和最大值非常简单。因为较小的值总是在左子节点上，在BST 上查找最小值，只需要遍历左子树，直到找到最后一个节点。

在BST 上查找最大值，只需要遍历右子树，直到找到最后一个节点，该节点上保存的值即为最大值。

最小值在最左边，最大值在最右边

```js
function minNum(node) {
  const minNode = node => {
      return node ? (node.left ? minNode(node.left) : node.key) : null
  }
  return minNode(node || this.root)
}

function maxNum(node) {
  const maxNode = node => {
      return node ? (node.right ? maxNode(node.right) : node.key) : null
  }
  return maxNode(node || this.root)
}
minNum(tree.root)  // 3
maxNum(tree.root)  // 25
```

##### 搜索特定的值

在BST 上查找给定值，需要比较该值和当前节点上的值的大小。通过比较，就能确定如果给定值不在当前节点时，该向左遍历还是向右遍历。

```js
function search(node,key){
  const searchNode = (node,key)=>{
    if(node === null)return false
    if(node.key === key) return true
    return searchNode( key < node.key ? node.left : node.right, key)
  }
  return searchNode(node, key)
}
search(tree.root,3)  // true
search(tree.root,3)  // false
```

##### 从二叉查找树上删除节点

从BST 上删除节点的操作最复杂，其复杂程度取决于删除哪个节点。如果删除没有子节点的节点，那么非常简单。如果节点只有一个子节点，不管是左子节点还是右子节点，就变得稍微有点复杂了。删除包含两个子节点的节点最复杂。

为了管理删除操作的复杂度，我们使用`递归`操作，同时定义两个方法：`remove() `和`removeNode()`。

从BST 中删除节点的第一步是`判断当前节点是否包含待删除的数据`，

- 如果包含，则删除该节点；
- 如果不包含，则比较当前节点上的数据和待删除的数据。
  - 如果待删除数据小于当前节点上的数据，则移至当前节点的左子节点继续比较；如果删除数据大于当前节点上的数据，则移至当前节点的右子节点继续比较。
  - 如果待删除节点是叶子节点（没有子节点的节点），那么只需要将从父节点指向它的链接指向null。
  - 如果待删除节点只包含一个子节点，那么原本指向它的节点就得做些调整，使其指向它的子节点。
  - 最后，如果待删除节点包含两个子节点，正确的做法有两种：要么查找待删除节点左子树上的最大值，要么查找其右子树上的最小值。这里我们选择后一种方式。

我们需要一个查找子树上最小值的方法，后面会用它找到的最小值创建一个临时节点。将临时节点上的值复制到待删除节点，然后再删除临时节点。

<img src="/Users/zhangchaoqun/Library/Application Support/typora-user-images/image-20240919134849139.png" alt="image-20240919134849139" style="zoom:33%;" />

整个删除过程由两个方法完成。remove() 方法只是简单地接受待删除数据，调用removeNode()删除它，后者才是完成主要工作的方法。两个方法的定义如下：

```js
function remove(data) {
  root = removeNode(this.root, data);
}
function removeNode(node, data) {
  if (node == null) {
    return null;
  }
  if (data == node.data) {
    // 没有子节点的节点
    if (node.left == null && node.right == null) {
      return null;
    }
    // 没有左子节点的节点
    if (node.left == null) {
      return node.right;
    }
    // 没有右子节点的节点
    if (node.right == null) {
      return node.left;
    }
    // 有两个子节点的节点
    var tempNode = getSmallest(node.right);
    node.data = tempNode.data;
    node.right = removeNode(node.right, tempNode.data);
    return node;
  }
  else if (data < node.data) {
    node.left = removeNode(node.left, data);
    return node;
  }
  else {
    node.right = removeNode(node.right, data);
    return node;
  }
}
```

#### 计数

BST 的一个用途是记录一组数据集中数据出现的次数。比如，可以使用BST 记录考试成绩的分布。给定一组考试成绩，可以写一段程序将它们加入一个BST，如果某成绩尚未在BST 中出现，就将其加入BST；如果已经出现，就将出现的次数加1。

#### 图的最小生成树问题

##### 普利姆算法(加点法)

1. 任选一个点为起点
2. 找到以当前选中点为起点路径最短的边
3. 如果这个边的另一端没有被连接起来，就连接
4. 如果这个边的另一端已经被连接，看倒数第二短的边
5. 重复2-4，使所有点被连接

```js
var max = 1000000;
var pointSet = [];
var distance = [
    [0, 4, 7, max, max],
    [4, 0, 8, 6, max],
    [7, 8, 0, 5, max],
    [max, 6, 5, 0, 7],
    [max, max, max, 7, 0]
];

function Node(value) {
    this.value = value;
    this.neighbor = [];
}

var a = new Node("A");
var b = new Node("B");
var c = new Node("C");
var d = new Node("D");
var e = new Node("E");

pointSet.push(a);
pointSet.push(b);
pointSet.push(c);
pointSet.push(d);
pointSet.push(e);


function getIndex(str) {
    for (var i = 0 ; i < pointSet.length ; i ++) {
        if (str == pointSet[i].value) return i;
    }
    return -1;
}

//需要传入点的集合，边的集合，当前已经连接进入的集合
// 此方法，根据当前已经有的节点，来进行判断，获取到距离最短的点
function getMinDisNode(pointSet, distance, nowPointSet) {
    var fromNode = null;//线段的起点
    var minDisNode = null;//线段的终点
    var minDis = max;
    //根据当前已有的这些点为起点，依次判断连接其他的点的距离是多少
    for (var i = 0 ; i < nowPointSet.length ; i ++) {
        var nowPointIndex = getIndex(nowPointSet[i].value);//获取当前节点的序号
        for (var j = 0 ; j < distance[nowPointIndex].length ; j ++) {
            var thisNode = pointSet[j];//thisNode表示distance中的点，但是这个点不是对象。
            if (nowPointSet.indexOf(thisNode) < 0//首先这个点不能是已经接入的点
            && distance[nowPointIndex][j] < minDis) {//其次点之间的距离得是目前的最短距离
                fromNode = nowPointSet[i];
                minDisNode = thisNode;
                minDis  = distance[nowPointIndex][j];
            }
        }
    }
    fromNode.neighbor.push(minDisNode);
    minDisNode.neighbor.push(fromNode);
    return minDisNode;
}

function prim(pointSet, distance, start) {
    var nowPointSet = [];
    nowPointSet.push(start);
    //获取最小代价的边
    while (true) {
        var minDisNode = getMinDisNode(pointSet, distance, nowPointSet);
        nowPointSet.push(minDisNode);
        if (nowPointSet.length == pointSet.length) {
            break;
        }
    }
}

prim(pointSet, distance, pointSet[2]);

console.log(pointSet);
```



##### 克鲁斯卡尔算法(加边法)

1. 选择最短的边进行连接
2. 要保证边连接的两个点至少有一个是新的点，或者这个边将两个部落进行连接
3. 重复1-2直到将所有点连接

```js
var max = 1000000;
var pointSet = [];
var distance = [
    [0, 4, 7, max, max],
    [4, 0, 8, 6, max],
    [7, 8, 0, 5, max],
    [max, 6, 5, 0, 7],
    [max, max, max, 7, 0]
];

function Node(value) {
    this.value = value;
    this.neighbor = [];
}

var a = new Node("A");
var b = new Node("B");
var c = new Node("C");
var d = new Node("D");
var e = new Node("E");

pointSet.push(a);
pointSet.push(b);
pointSet.push(c);
pointSet.push(d);
pointSet.push(e);

function canLink(resultList, tempBegin, tempEnd) {
    var beginIn = null;
    var endIn = null;
    for (var i = 0 ; i < resultList.length ; i ++) {
        if (resultList[i].indexOf(tempBegin) > -1) {
            beginIn = resultList[i];
        }
        if (resultList[i].indexOf(tempEnd) > -1) {
            endIn = resultList[i];
        }
    }
    //两个点都是新的点（都不在任何部落里）——可以连接，产生新的部落
    // begin在A部落，end没有部落 —— A部落扩张一个村庄
    // end在A部落，begin没有部落 ——A部落扩张一个村庄
    // begin在A部落，end在B部落 ——将AB两个部落合并
    // begin和end在同一个部落，——不可以连接
    if (beginIn != null && endIn != null && beginIn == endIn) {
        return false;
    }
    return true;
}

function link(resultList, tempBegin, tempEnd) {
    var beginIn = null;
    var endIn = null;
    for (var i = 0 ; i < resultList.length ; i ++) {
        if (resultList[i].indexOf(tempBegin) > -1) {
            beginIn = resultList[i];
        }
        if (resultList[i].indexOf(tempEnd) > -1) {
            endIn = resultList[i];
        }
    }
    if (beginIn == null && endIn == null) {// 两个点都是新的点（都不在任何部落里）——可以连接，产生新的部落
        var newArr = [];
        newArr.push(tempBegin);
        newArr.push(tempEnd);
        resultList.push(newArr);
    } else if (beginIn != null && endIn == null) {// begin在A部落，end没有部落 —— A部落扩张一个村庄
        beginIn.push(tempEnd);
    } else if (beginIn == null && endIn != null) {// end在A部落，begin没有部落 ——A部落扩张一个村庄
        endIn.push(tempBegin);
    } else if (beginIn != null && endIn != null && beginIn != endIn) {// begin在A部落，end在B部落 ——将AB两个部落合并
        var allIn = beginIn.concat(endIn);
        var needRemove = resultList.indexOf(endIn);
        resultList.splice(needRemove, 1);
        needRemove = resultList.indexOf(beginIn);
        resultList.splice(needRemove, 1);
        resultList.push(allIn);
    }
    tempBegin.neighbor.push(tempEnd);
    tempEnd.neighbor.push(tempBegin);
}

function kruskal(pointSet, distance) {

    var resultList = [];//这里是二维数组，此数组代表的是有多少个"部落"

    while(true) {
        var minDis = max;
        var begin = null;
        var end = null;
        for (var i = 0 ; i < distance.length ; i ++) {
            for (var j = 0 ; j < distance[i].length ; j ++) {
                var tempBegin = pointSet[i];
                var tempEnd = pointSet[j];
                if (i != j//去掉自己到自己的距离，因为都为0
                    && distance[i][j] < minDis
                    && canLink(resultList, tempBegin, tempEnd)
                ) {
                    minDis = distance[i][j];
                    begin = tempBegin;
                    end = tempEnd;
                }
            }
        }
        link(resultList, begin, end);
        if (resultList.length == 1 && resultList[0].length == pointSet.length) {//只存在一个部落
            break;
        }
    }

}

kruskal(pointSet, distance);
console.log(pointSet);
```



#### 二叉树的单旋、双旋

##### 单旋(左单旋、右单旋)

某节点不平衡，左浅右深，进行`左单旋`

1.找到新根  2.找到变化分支  3.当前旋转节点和右子树为变化分支 4.新根的左孩子为旋转节点 5.返回新的根节点

某节点不平衡，左深右浅，进行`右单旋`

`旋转节点`：不平衡的节点。`左单旋`    `右单旋`

`新根`：旋转之后为根节点的节点。`左单旋`：右子树的根节点， `右单旋`：左子树的根节点，

` 变化节点`：父级发生变化的分支。`左单旋`：右子树的左子树， `右单旋`：左子树的右子树，

`不变节点`：父级发生不变化的分支。`左单旋`：右子树的右子树， `右单旋`：左子树的左子树，

单旋条件：变化分支不可以是最深分支

```js
function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

var node2 = new Node("2");
var node5 = new Node("5");
var node3 = new Node("3");
var node6 = new Node("6");

node2.right = node5;
node5.left = node3;
node5.right = node6;

function getDeep(root) {
    if (root == null) return 0;
    var leftDeep = getDeep(root.left);
    var rightDeep = getDeep(root.right);
    return Math.max(leftDeep, rightDeep) + 1;
}

function isBalance(root) {
    if (root == null) return true;
    var leftDeep = getDeep(root.left);
    var rightDeep = getDeep(root.right);
    if (Math.abs(leftDeep - rightDeep) > 1) {//不平衡
        return false;
    } else {
        return isBalance(root.left) && isBalance(root.right);
    }
}

function leftRotate(root) {
    // 找到新根
    var newRoot = root.right;
    // 找到变化分支
    var changeTree = root.right.left;
    // 当前旋转节点的右孩子为变化分支
    root.right = changeTree;
    // 新根的左孩子为旋转节点
    newRoot.left = root;
    // 返回新的根节点
    return newRoot;
}

function rightRotate(root) {
    // 找到新根
    var newRoot = root.left;
    // 找到变化分支
    var changeTree = root.left.right;
    // 当前旋转节点的左孩子为变化分支
    root.left = changeTree;
    // 新根的右孩子为旋转节点
    newRoot.right = root;
    // 返回新的根节点
    return newRoot;
}

function change(root) {//返回平衡之后的根节点
    if (isBalance(root)) return root;
    if (root.left != null) root.left = change(root.left);
    if (root.right != null) root.right = change(root.right);
    var leftDeep = getDeep(root.left);
    var rightDeep = getDeep(root.right);
    if (Math.abs(leftDeep - rightDeep) < 2) {
        return true;
    } else if (leftDeep > rightDeep) {//不平衡，左边深，需要右旋
        return rightRotate(root);
    } else {//不平衡，右边深，需要左旋
        return leftRotate(root);
    }
}

console.log(isBalance(node2));

var newRoot = change(node2);

console.log(isBalance(newRoot));
console.log(newRoot);
```

##### 双旋(右左双旋、左右双旋)

对某个节点进行`左单旋`时，如果变化分支是唯一的最深分支，需要对新根线`右单旋`，再继续左单旋，成为`右左双旋`

对某个节点进行`右单旋`时，如果变化分支是唯一的最深分支，需要对新根线`左单旋`，再继续右单旋，成为`左右双旋`

```js
function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

var node8 = new Node("8");
var node7 = new Node("7");
var node6 = new Node("6");
var node5 = new Node("5");
var node2 = new Node("2");

node8.left = node7;
node7.left = node6;
node6.left = node5;
node5.left = node2;

function getDeep(root) {
    if (root == null) return 0;
    var leftDeep = getDeep(root.left);
    var rightDeep = getDeep(root.right);
    return Math.max(leftDeep, rightDeep) + 1;
}

function isBalance(root) {
    if (root == null) return true;
    var leftDeep = getDeep(root.left);
    var rightDeep = getDeep(root.right);
    if (Math.abs(leftDeep - rightDeep) > 1) {//不平衡
        return false;
    } else {
        return isBalance(root.left) && isBalance(root.right);
    }
}

function leftRotate(root) {
    // 找到新根
    var newRoot = root.right;
    // 找到变化分支
    var changeTree = root.right.left;
    // 当前旋转节点的右孩子为变化分支
    root.right = changeTree;
    // 新根的左孩子为旋转节点
    newRoot.left = root;
    // 返回新的根节点
    return newRoot;
}

function rightRotate(root) {
    // 找到新根
    var newRoot = root.left;
    // 找到变化分支
    var changeTree = root.left.right;
    // 当前旋转节点的左孩子为变化分支
    root.left = changeTree;
    // 新根的右孩子为旋转节点
    newRoot.right = root;
    // 返回新的根节点
    return newRoot;
}

function change(root) {//返回平衡之后的根节点
    if (isBalance(root)) return root;
    if (root.left != null) root.left = change(root.left);
    if (root.right != null) root.right = change(root.right);
    var leftDeep = getDeep(root.left);
    var rightDeep = getDeep(root.right);
    if (Math.abs(leftDeep - rightDeep) < 2) {
        return root;
    } else if (leftDeep > rightDeep) {//不平衡，左边深，需要右旋
        var changeTreeDeep = getDeep(root.left.right);
        var noChangeTreeDeep = getDeep(root.left.left);
        if (changeTreeDeep > noChangeTreeDeep) {
            root.left = leftRotate(root.left);
        }
        return rightRotate(root);
    } else {//不平衡，右边深，需要左旋
        var changeTreeDeep = getDeep(root.right.left);
        var noChangeTreeDeep = getDeep(root.right.right);
        if (changeTreeDeep > noChangeTreeDeep) {
            root.right = rightRotate(root.right);
        }
        return leftRotate(root);
    }
    return root;
}

function addNode(root, num) {
    if (root == null) return;
    if (root.value == num) return;
    if (root.value < num) {//目标值比当前节点大
        if (root.right == null) root.right = new Node(num);//如果右侧为空，则创建节点
        else addNode(root.right, num);//如果右侧不为空，则向右侧进行递归
    } else {//目标值比当前节点小
        if (root.left == null) root.left = new Node(num);
        else addNode(root.left, num);
    }
}

function buildSearchTree(arr) {
    if (arr == null || arr.length == 0) return null;
    var root = new Node(arr[0]);
    for (var i = 1 ; i < arr.length ; i ++) {
        addNode(root, arr[i]);
    }
    return root;
}

var num2 = 0;
function searchByTree(root, target) {
    if (root == null) return false;
    num2 += 1;
    if (root.value == target) return true;
    if (root.value > target) return searchByTree(root.left, target);
    else return searchByTree(root.right, target);
}
var arr = [];
for (var i = 0 ; i < 10000 ; i ++) {
    arr.push(Math.floor(Math.random() * 10000));
}

var root = buildSearchTree(arr);
// console.log(searchByTree(root, 1000));
// console.log(num2);

var newRoot = change(root);
// num2 = 0;
// console.log(searchByTree(newRoot, 1000));
// console.log(num2);
console.log(isBalance(newRoot));

// console.log(isBalance(node8));
//
// var newRoot = change(node8);
//
// console.log(isBalance(newRoot));
// console.log(newRoot);
```

##### 左左双旋与右右双旋

如果变化分支的高度比旋转节点的另一侧高度差距超过2，单旋之后依然不平衡

```js
function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

var node8 = new Node("8");
var node7 = new Node("7");
var node6 = new Node("6");
var node5 = new Node("5");
var node2 = new Node("2");

node8.left = node7;
node7.left = node6;
node6.left = node5;
node5.left = node2;

function getDeep(root) {
    if (root == null) return 0;
    var leftDeep = getDeep(root.left);
    var rightDeep = getDeep(root.right);
    return Math.max(leftDeep, rightDeep) + 1;
}

function isBalance(root) {
    if (root == null) return true;
    var leftDeep = getDeep(root.left);
    var rightDeep = getDeep(root.right);
    if (Math.abs(leftDeep - rightDeep) > 1) {//不平衡
        return false;
    } else {
        return isBalance(root.left) && isBalance(root.right);
    }
}

function leftRotate(root) {
    // 找到新根
    var newRoot = root.right;
    // 找到变化分支
    var changeTree = root.right.left;
    // 当前旋转节点的右孩子为变化分支
    root.right = changeTree;
    // 新根的左孩子为旋转节点
    newRoot.left = root;
    // 返回新的根节点
    return newRoot;
}

function rightRotate(root) {
    // 找到新根
    var newRoot = root.left;
    // 找到变化分支
    var changeTree = root.left.right;
    // 当前旋转节点的左孩子为变化分支
    root.left = changeTree;
    // 新根的右孩子为旋转节点
    newRoot.right = root;
    // 返回新的根节点
    return newRoot;
}

function change(root) {//返回平衡之后的根节点
    if (isBalance(root)) return root;
    if (root.left != null) root.left = change(root.left);
    if (root.right != null) root.right = change(root.right);
    var leftDeep = getDeep(root.left);
    var rightDeep = getDeep(root.right);
    if (Math.abs(leftDeep - rightDeep) < 2) {
        return root;
    } else if (leftDeep > rightDeep) {//不平衡，左边深，需要右旋
        var changeTreeDeep = getDeep(root.left.right);
        var noChangeTreeDeep = getDeep(root.left.left);
        if (changeTreeDeep > noChangeTreeDeep) {
            root.left = leftRotate(root.left);
        }
        var newRoot = rightRotate(root);
        newRoot.right = change(newRoot.right);
        newRoot = change(newRoot);
        return newRoot;
    } else {//不平衡，右边深，需要左旋
        var changeTreeDeep = getDeep(root.right.left);
        var noChangeTreeDeep = getDeep(root.right.right);
        if (changeTreeDeep > noChangeTreeDeep) {
            root.right = rightRotate(root.right);
        }
        var newRoot = leftRotate(root);
        newRoot.left = change(newRoot.left);
        newRoot = change(newRoot);
        return newRoot;
    }
    return root;
}

function addNode(root, num) {
    if (root == null) return;
    if (root.value == num) return;
    if (root.value < num) {//目标值比当前节点大
        if (root.right == null) root.right = new Node(num);//如果右侧为空，则创建节点
        else addNode(root.right, num);//如果右侧不为空，则向右侧进行递归
    } else {//目标值比当前节点小
        if (root.left == null) root.left = new Node(num);
        else addNode(root.left, num);
    }
}

function buildSearchTree(arr) {
    if (arr == null || arr.length == 0) return null;
    var root = new Node(arr[0]);
    for (var i = 1 ; i < arr.length ; i ++) {
        addNode(root, arr[i]);
    }
    return root;
}

var num2 = 0;
function searchByTree(root, target) {
    if (root == null) return false;
    num2 += 1;
    if (root.value == target) return true;
    if (root.value > target) return searchByTree(root.left, target);
    else return searchByTree(root.right, target);
}
var arr = [];
for (var i = 0 ; i < 10000 ; i ++) {
    arr.push(Math.floor(Math.random() * 10000));
}

var root = buildSearchTree(arr);
console.log(searchByTree(root, 1000));
console.log(num2);

var newRoot = change(root);
num2 = 0;
console.log(searchByTree(newRoot, 1000));
console.log(num2);
console.log(isBalance(newRoot));







// console.log(isBalance(node8));
//
// var newRoot = change(node8);
//
// console.log(isBalance(newRoot));
// console.log(newRoot);
```



## 10. 图

图由边的集合及顶点的集合组成。

顶点也有权重，也称为成本。如果一个图的顶点对是有序的，则可以称之为有向图。在对有向图中的顶点对排序后，便可以在两个顶点之间绘制一个箭头。有向图表明了顶点的流向。

1. 概念：由一组顶点和连接顶点之间的边所组成的数据结构
2. 表示方法： G=(V, E) V是图G中顶点的集合，E是图G中边的集合。

### 图的分类

#### 无向图

连接顶点的边没有方向

<img src="/Users/zhangchaoqun/Library/Application Support/typora-user-images/image-20240919160127398.png" alt="image-20240919160127398" style="zoom:33%;" />
`说明`：由一条边连接起来的顶点，称为`相邻顶点`，比如A和B是相邻的，A和D是相邻的，A和C 是相邻的，A和E不是相邻的。一个顶点的度，是其相邻顶点的数量。例如：A的度为3，E的度为2。如果存在环称为有环图，如果每两个顶点之间都存在路径，则称图是连通的。

#### 有向图

连接顶点的边有方向

<img src="/Users/zhangchaoqun/Library/Application Support/typora-user-images/image-20240919160045664.png" alt="image-20240919160045664" style="zoom:33%;" />

`说明：` 如果图中每两个顶点间在双向上都存在路径，则该图是强连通的。例如，C和D是强连通的， 而A和B不是强连通的。

图中的一系列顶点构成`路径`，路径中所有的`顶点`都由`边`连接。路径的`长度`用路径中第一个顶点到最后一个顶点之间边的数量表示。由指向自身的顶点组成的路径称为`环`，环的长度为0。`圈`是至少有一条边的路径，且路径的第一个顶点和最后一个顶点相同。无论是有向图还是无向图，只要是没有重复边或重复顶点的圈，就是一个简单圈。除了第一个和最后一个顶点以外，路径的其他顶点有重复的圈称为`平凡圈`。如果两个顶点之间有路径，那么这两个顶点就是`强连通`的，反之亦然。如果有向图的所有的顶点都是强连通的，那么这个有向图也是强连通的。

#### 加权图

图的边被赋予了权值

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/5ef88fc28bcfa49a190a213584f8064a.png)

### 图的表示方法

1. 邻接矩阵
2. 邻接表

#### 邻接矩阵

1. 可以通过一个二维数组来表示图的结构
2. 当图为稀疏图时这个二维数组许多的空间都会被赋值为0，浪费计算机存储空间
3. 邻接矩阵示意图

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/a4d3bb5e4d9899302a01110d67294f9e.png)

`说明：`用一个二维数组表示，如果这两个顶点相邻，那么这个值就记为1，否则记为0。这种方法可能会记录很多0，造成计算机性能的浪费。因为即使这个顶点只有一个相邻顶点，我们也要迭代一整行。例如：上面I顶点。

#### 邻接表

**由一个顶点以及跟这个顶点相邻的其他顶点列表组成，能够减少内存消耗。**

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/c507282c7d04e4c62c933009cdef32b8.png)
**使用javascript创建图：**

```js
class Graph {
  constructor(){
    this.vertices = []  // 用来保存顶点的数组
    this.adjList = {} // 用来保存边的字典，可以直接用一个对象代替。
  }
  // 添加顶点
  addVertex(v){
    this.vertices.push(v)
    this.adjList[v] = []
  }
  // 添加边
  addEdge(v,w){
    this.adjList[v].push(w)
    this.adjList[w].push(v)
  }
  // 返回字符串
  graphToString(){
    return this.vertices.reduce((r,v) => {
      return this.adjList[v].reduce((r,w) => {
        return r + `${w}`
      },`${r}\n${v} => `)
    },'')
  }
}
const graph = new Graph();

['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].forEach(c => graph.addVertex(c))

graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')

console.log(graph.graphToString())
```

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/836f0f663709f1586eecf083957eb965.png)

### 图的遍历

确定从一个指定的顶点可以到达其他哪些顶点，这是经常对图执行的操作。我们可能想通过地图了解到从一个城镇到另一个城镇有哪些路，或者从一个机场到其他机场有哪些航班。图上的这些操作是用搜索算法执行的。在图上可以执行两种基础搜索：深度优先搜索和广度优先搜索。

将图的每个顶点访问一次，并且不能有重复的访问

- 广度优先遍历（Breadth-first-search BFS）
- 深度优先遍历（Depth-first-search DFS）

#### 广度优先遍历

广度优先搜索从第一个顶点开始，尝试访问尽可能靠近它的顶点。本质上，这种搜索在图上是逐层移动的，首先检查最靠近第一个顶点的层，再逐渐向下移动到离起始顶点最远的层。

<img src="/Users/zhangchaoqun/Library/Application Support/typora-user-images/image-20240919160850087.png" alt="image-20240919160850087" style="zoom:33%;" />

广度优先搜索算法使用了`抽象的队列`而不是数组来对已访问过的顶点进行排序。其算法的工作原理如下：

(1) 查找与当前顶点相邻的未访问顶点，将其添加到已访问顶点列表及队列中；

(2) 从图中取出下一个顶点v，添加到已访问的顶点列表；

(3) 将所有与v 相邻的未访问顶点添加到队列。

`广度优先遍历`：队列，通过将顶点存入队列中，最先入队列的顶点先被探索。广度优先搜索算法会从指定的第一个顶点开始遍历图，先访问其所有的相邻点，就像一次访问图的一层。简单说，就是一层一层地访问顶点，如下图所示：
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/294482dcc2de07bf40eeae8a68d22844.png)
**在javascript中实现广度优先遍历：**

```js
breadthFirst(v, callback) {
    const read = []
    const adjList = this.adjList
    let pending = [v || this.vertices[0]]

    const readVertices = vertices => {
      vertices.forEach(key => {
        read.push(key)
        pending.shift()
        adjList[key].forEach(v => {
          if (!pending.includes(v) && !read.includes(v)) {
              pending.push(v)
          }
        })
        if (callback) callback(key)
        if (pending.length) readVertices(pending)
      })
    }
    readVertices(pending)
  }
```

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/0e140d8cb2004141066cbc149682d1b8.png)

#### 深度优先遍历

深度优先搜索包括从一条路径的起始顶点开始追溯，直到到达最后一个顶点，然后回溯，继续追溯下一条路径，直到到达最后的顶点，如此往复，直到没有路径为止。这不是在搜索特定的路径，而是通过搜索来查看在图中有哪些路径可以选择。

深度优先搜索算法比较简单：访问一个没有访问过的顶点，将它标记为已访问，再递归地去访问在初始顶点的邻接表中其他没有访问过的顶点。

<img src="/Users/zhangchaoqun/Library/Application Support/typora-user-images/image-20240919160706628.png" alt="image-20240919160706628" style="zoom:33%;" />

`深度优先遍历：`深度优先搜索算法将会从第一个指定的顶点开始遍历图，沿着路径直到这条路径最后一个顶 点被访问了，接着原路回退并探索下一条路径。换句话说，它是先深度后广度地访问顶点，如下图所示：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/ffc06b5f315b99689a2c83922737ff65.png)
**在javascript中实现深度优先遍历：**

```js
deepFirst(callback) {
    const read = []
    const adjList = this.adjList
    const readVertices = vertices => {
      vertices.forEach(key => {
        if (read.includes(key)) return false
        read.push(key)
        if (callback) callback(key)
        if (read.length !== this.vertices.length) {
          readVertices(adjList[key])
        }
      })
    }
    readVertices(Object.keys(adjList))
}
```

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/083fd87140fcd22992092c10d231df46.png)

### 查找最短路径

图最常见的操作之一就是寻找从一个顶点到另一个顶点的最短路径。考虑下面的例子：假期中，你将在两个星期的时间里游历10 个大联盟城市，去观看棒球比赛。你希望通过最短路径算法，找出开车游历这10 个城市行驶的最小里程数。另一个最短路径问题涉及创建一个计算机网络时的开销，其中包括两台电脑之间传递数据的时间，或者两台电脑建立和维护连接的成本。最短路径算法可以帮助确定构建此网络的最有效方法。

在执行广度优先搜索时，会自动查找从一个顶点到另一个相连顶点的最短路径。例如，要查找从顶点A 到顶点D 的最短路径，我们首先会查找从A 到D 是否有任何一条单边路径，接着查找两条边的路径，以此类推。这正是广度优先搜索的搜索过程，因此我们可以轻松地修改广度优先搜索算法，找出最短路径。

要查找最短路径，需要修改广度优先搜索算法来记录从一个顶点到另一个顶点的路径。这需要对Graph 类做一些修改。首先，需要一个数组来保存从一个顶点到下一个顶点的所有边。我们将这个数组命名为edgeTo。因为从始至终使用的都是广度优先搜索函数，所以每次都会遇到一个没有标记的顶点，除了对它进行标记外，还会从邻接列表中我们正在探索的那个顶点添加一条边到这个顶点。这是新的bfs() 函数，以及需要添加到Graph 类的代码：

```JS
// 将这行添加到Graph 类
this.edgeTo = [];
// bfs 函数
function bfs(s) {
  var queue = [];
  this.marked[s] = true;
  queue.push(s); // 添加到队尾
  while (queue.length > 0) {
    var v = queue.shift(); // 从队首移除
    if (v == undefined) {
      print("Visisted vertex: " + v);
    }
    for each(var w in this.adj[v]) {
      if (!this.marked[w]) {
        this.edgeTo[w] = v;
        this.marked[w] = true;
        queue.push(w);
      }
    }
  }
}
```

现在我们需要一个函数，用于展示图中连接到不同顶点的路径。函数pathTo() 创建了一个栈，用来存储与指定顶点有共同边的所有顶点。以下是pathTo() 函数的代码，以及一个简单的辅助函数：

```JS
function pathTo(v) {
  var source = 0;
  if (!this.hasPathTo(v)) {
    return undefined;
  }
  var path = [];
  for (var i = v; i != source; i = this.edgeTo[i]) {
    path.push(i);
  }
  path.push(s);
  return path;
}
function hashPathTo(v) {
  return this.marked[v];
}
//需要确保有将以下声明添加到Graph() 构造函数中：
this.pathTo = pathTo;
this.hasPathTo = hashPathTo;
```



### 拓扑排序

拓扑排序会对有向图的所有顶点进行排序，使有向边从前面的顶点指向后面的顶点。

<img src="/Users/zhangchaoqun/Library/Application Support/typora-user-images/image-20240919164020575.png" alt="image-20240919164020575" style="zoom:33%;" />

这类问题被称为优先级约束调度

拓扑排序算法与深度优先搜索类似。不同的是，拓扑排序算法不会立即输出已访问的顶点，而是访问当前顶点邻接表中的所有相邻顶点，直到这个列表穷尽时，才将当前顶点压入栈中。

拓扑排序算法被拆分为两个函数。第一个函数topSort()，会设置排序进程并调用一个辅助函数topSortHelper()，然后显示排序好的顶点列表。

主要工作是在递归函数topSortHelper() 中完成的。这个函数会将当前顶点标记为已访问，然后递归访问当前顶点邻接表中的每个相邻顶点，标记这些顶点为已访问。最后，将当前顶点压入栈。





# 三. 算法

## 1. 排序算法

从 `ECMA262` 关于 `sort` 的规定 到 `大小关系比较` 的原理，再到 `V8` 引擎实现原理，从头到尾梳理了一遍 `Array.prototype.sort` ，可以回答开头的几个问题：

1. `ECMA262` 规范中 `Array.prototype.sort` 的逻辑是什么？ 先定义一个大小比较的标准 `SortCompare`，这个 `SortCompare` 要具有自反性，对称性和传递性；再定义 `sort` 需要修改原数组并返回修改后的数组；最后定义由引擎开发者自己决定用什么排序算法来实现。
2. `Array.prototype.sort` 排序方法是什么？ 不是常见的排序算法中的任何一种，而是学习了 python 的排序实现，使用了 Tim 实现的 `Tim sort` 算法，汇集了各种优化。
3. 复杂度是多少？ 最好时间复杂度为 `O(n)`，平均时间复杂度 `O(nlogn)`，最坏时间复杂度为 `O(nlogn)`，比最常用的快速排序的最坏时间复杂度 `O(n²)` 要更优秀；空间复杂度为 `O(n)`，并且为稳定排序算法。

### 冒泡排序(比较相邻项)

`1.冒泡排序：`冒泡排序比较任何两个相邻的项，如果第一个比第二个大，则交换它们。最坏的情况下比较n轮，n为数组的长度。

时间复杂度：
$$
最好情况：O(N)\\
最坏情况：O(N^2)\\
平均：O(N^2)
$$
空间复杂度：
$$
O(1)
$$
稳定性：不稳定

```js
const arr = [2,4,1,9,8,7,6,5,3]
function bubbleSort(arr){
  if(!Array.isArray(arr)){
    console.log('请输入一个数组！')
    return false
  }
  const len = arr.length
  for(let i=0; i<len; i++){
    for(let j=0; j<len - i; j++){
      if(arr[j] > arr[j+1]){
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
    }
  }
  return arr
}
const res = bubbleSort(arr)  // [1, 2, 3, 4, 5,6, 7, 8, 9]

```

模拟图：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/37ffe636dd95fd055477ab0419b65908.png)

### 快速排序(分左右两块递归)

`2.快速排序`：

时间复杂度：
$$
最好情况：O(NlogN)\\
最坏情况：O(N^2)\\
平均：O(NlogN)
$$
空间复杂度：
$$
O(NlogN)
$$
稳定性：不稳定

```js
// 1. 选择基准值，一般选择数组中间的值并且向下取整
// 2. 定义左右两个数组，比基准值小的放在左边，比基准值大的放在右边
// 3. 递归左右两个数组
// 4. 终止条件是左右两个数组都只有一个元素
const arr = [49, 38, 65, 97, 76, 13, 27, 49]
function quickSort(arr){
  // 终止条件是左右两个数组都只有一个元素
  if(arr.length<2){
    return arr
  }
  // 定义左右两个数组
  const leftArr = [],
    rightArr = []
  
  // 获取基准值
  const index = Math.floor(arr.length/2)
  const baseValue = arr.splice(index,1)

  // 比基准值小的放在左边，比基准值大的放在右边
  for(let i of arr){
    if(i < baseValue){
      leftArr.push(i)
    }else{
      rightArr.push(i)
    }
  }

  // 递归左右两个数组
  return [...quickSort(leftArr), ...baseValue, ...quickSort(rightArr)]
}
const res = quickSort(arr)
console.log(res);  // [13, 27, 38, 49,49, 65, 76, 97]

```

### 选择排序(不断找最小值)

`3.选择排序：`找到数据结构中的最小值并 将其放置在第一位，接着找到第二小的值并将其放在第二位，以此类推。

时间复杂度：
$$
O(N^2)
$$
空间复杂度：
$$
O(1)
$$
稳定性：判断条件时使用<还是<=

```js
// 选择排序：每次找到最小值放在最前面
const arr = [49, 38, 65, 97, 76, 13, 27, 49]
function choseSort(arr){
  for(let i=0; i<arr.length; i++){
    // 假设最小值元素对应的下标为 i
    let minIndex = i
    // 寻找最小值
    for(let j=i+1; j<arr.length; j++){
      if(arr[minIndex] > arr[j]){
        minIndex = j
      }
    }
    // 交换数据，第一轮交换第一个数和最小数的位置，以此类推
    [arr[i],arr[minIndex]] = [arr[minIndex],arr[i]]
  }
  return arr
}
const res = choseSort(arr)
console.log(res);  // [13, 27, 38, 49,49, 65, 76, 97]

```

### 插入排序(左侧始终有序)

`4.插入排序：`对循环次数的真正优化，将一组无序数列的左侧始终看成是有序的。

时间复杂度：
$$
最好情况：O(n) /最坏情况和平均：O(n^2)
$$
空间复杂度：
$$
O(1)
$$
稳定性：稳定

```js
// 1. 第一次是首位，因为只有一个元素
// 2. 第二次取出数组中第二个元素，从后向前遍历左侧的有序数列，找到第一个比这个数大的数，将取出来的数插到这个数的前面
// 3. 如果没有比取出来的数大的，则将这个数插在左侧有序数列的最后面
// 4. 重复步骤2,3，每次向后取一个元素
const arr = [49, 38, 65, 97, 76, 13, 27, 49]
function insertSort(arr){
  for(let i=1; i<arr.length; i++){
    // 把要比较的元素提取出来，j意思是从当前位置的前一个数开始往前比较
    let targetNum = arr[i],j = i-1
    // 从后向前遍历
    while(j >= 0 && arr[j] > targetNum){
      // 将比当前这个数更大的数往后挪一个位置
      arr[j+1] = arr[j];
      j--
    }
    // 把当前比较的放在正确的位置上，没有比目标数大的数，则目标数就在原位，不需要改动
    arr[j+1] = targetNum
  }
  return arr
}
const res = insertSort(arr)
console.log(res);  // [13, 27, 38, 49,49, 65, 76, 97]

```

### 归并排序(先切分再合并)

`5.归并排序`：归并排序是一种分治算法。其思想是将原始数组切分成较小的数组，直到每个小数组只有一 个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。

空间复杂度：
$$
O(n)
$$
时间复杂度：
$$
O(NlogN)=O(N)*O(logN)\\
O(N):每一层归并的时间\\
O(logN+1):归并的最大层数
$$
稳定

```js
// 合并两个有序数组
// 将待排序序列不断地二分，直到只有一个元素。
// 递归地将左右两个子序列进行归并排序。
// 合并两个有序子序列，生成一个新的有序序列。

// 合并地具体操作如下：
// 创建一个临时数组，用于存储合并结果。
// 比较左右两个子序列的第一个元素，将较小的元素放入临时数组，并将对应子序列的指针向后移动一位。
// 重复上述比较和放入操作，直到其中一个子序列为空。
// 将另一个非空子序列的剩余元素依次放入临时数组。
// 将临时数组的元素复制回原始数组相应位置。
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  
  const mid = Math.floor(arr.length / 2);//中间位置
  const left = arr.slice(0, mid);//左侧子序列
  const right = arr.slice(mid);//右侧子序列
  
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  let i = 0;
  let j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
}

// 示例用法
const arr = [5, 3, 8, 4, 2, 9, 1, 7, 6];
const sortedArr = mergeSort(arr);
console.log(sortedArr);  // [1, 2, 3, 4, 5, 6, 7, 8, 9]

```

### 计数排序(适合整数数组)

### 希尔排序(逐渐缩小间隔分组插入排序)

希尔排序(Shell Sort)是插入排序的一种，它是针对直接插入排序算法的改进。

希尔排序又称缩小增量排序，因 DL.Shell 于 1959 年提出而得名。

它通过比较相距一定间隔的元素来进行，各趟比较所用的距离随着算法的进行而减小，直到只比较相邻元素的最后一趟排序为止。

希尔排序时间复杂度是 **O(n^(1.3-2))**，空间复杂度为常数阶 **O(1)**。希尔排序没有时间复杂度为 **O(n(logn))** 的快速排序算法快 ，因此对中等大小规模表现良好，但对规模非常大的数据排序不是最优选择，总之比一般 **O(n^2 )** 复杂度的算法快得多。

希尔排序目的为了加快速度改进了插入排序，交换不相邻的元素对数组的局部进行排序，并最终用插入排序将局部有序的数组排序。

在此我们选择增量 **gap=length/2**，缩小增量以 **gap = gap/2** 的方式，用序列 **{n/2,(n/2)/2...1}** 来表示。

时间复杂度：
$$
O(NlogN)
$$
空间复杂度：
$$
O(1)
$$
稳定性：稳定

如图示例：

（1）初始增量第一趟 **gap = length/2 = 4**

<img src="https://www.runoob.com/wp-content/uploads/2020/09/ShellSort-01.png" alt="img" style="zoom: 50%;" />

（2）第二趟，增量缩小为 2

<img src="https://www.runoob.com/wp-content/uploads/2020/09/ShellSort-02.png" alt="img" style="zoom:50%;" />

（3）第三趟，增量缩小为 1,得到最终排序结果

<img src="https://www.runoob.com/wp-content/uploads/2020/09/ShellSort-03.png" alt="img" style="zoom:50%;" />

```js
```



### 堆排序(大顶堆不断取出堆顶再维护堆)

`大顶堆`:所有父节点大于其子节点

`小顶堆`:所有父节点小于其子节点

`heapify-维护堆的性质`:使不满足大顶堆、小顶堆变为大顶堆、小顶堆的方法，时间复杂度为O(logN)

`recursion heapify-建堆`:使无序数组变为大顶堆、小顶堆，时间复杂度为O(N)

时间复杂度：
$$
O(NlogN)
$$
时间复杂度：
$$
O(1)
$$
稳定性：不稳定

```js
let heapSort = function(arr){
  // 构建大顶堆
  buildMaxHeap(arr);
  // 交换堆顶元素与末尾元素，然后重新调整堆
  for (let i = arr.length - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, 0, i);
  }
  return arr;
}
// 构建大顶堆
function buildMaxHeap(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, i, n);
  }
}
// 调整堆
//arr:待存储堆的数组，i:待维护节点的下标，n:数组长度
function heapify(arr, i, n) {
  //暂定最大值的下标为待维护节点
  let largest = i;
  //待维护节点左孩子的下标
  const left = 2 * i + 1;
  //待维护节点右孩子的下标
  const right = 2 * i + 2;
  //如果待维护节点的左孩子节点的值大于待维护节点的值，最大值节点变为左孩子的下标
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  //如果待维护节点的右孩子节点的值大于待维护节点的值，最大值节点变为右孩子的下标
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
	//如果改变了最大值的下标，调换待维护节点和最大值下标的值，再次递归调整堆
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, largest, n);
  }
}

const unsortedArray = [64, 25, 12, 22, 11];
const sortedArray = heapSort(unsortedArray);
console.log(sortedArray); // 输出 [11, 12, 22, 25, 64]
```



## 2. 搜索算法

### 顺序搜索

`顺序搜索：`最基本的一种搜索算法，就是将数据结构中的每一个元素，和我们要找的元素作比较，这种搜索算法非常的低效率。

```js
const arr = [5,4,3,2,1]
const arr = [5,4,3,2,1]
function sequentialSearch(arr, value){
  for(let i of arr){
    if(i == value)return '搜索到了'
  }
  return '没有搜索到'
}
const res = sequentialSearch(arr, 3)
console.log(res,'res==');  // 搜索到了

```

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/07bc6f67924b2987f5c3a7e85da67b5b.png)

### 二分搜索

`二分搜索`：

```js
// 二分搜索
// 1. 要求被搜索的数据结构已经排序，选择中间值
// 2. 如果中间值等于目标值，则找到，算法执行完毕
// 3. 如果中间值大于目标值，则说明目标值在中间值的左侧，此时在左侧在找到中间值，在比较，以此类推
// 4. 如果中间值小于目标值，则说明目标值在中间值的右侧，此时在右侧在找到中间值，在比较，以此类推
const arr = [1,2,3,4,5,6,7,8]
function BinarySearchTree(arr, value){
  // arr是一个已经排序好的数组，如果是无序的先进行排序
  let left = 0
  let right = arr.length - 1
  while(left <= right){
    // 中间值的下标
    let mid = Math.floor((left + right) / 2)
    if(arr[mid] == value){
      return `找到了下标为：${mid}`
    }else if(arr[i] > value){
      right = mid -1
    }else{
      left = mid +1
    }
  }
  return '找不到目标值'
 }
  const res = BinarySearchTree(arr,5)  // '找到了下标为：4'
  const res = BinarySearchTree(arr,9)  // '找不到目标值'

```

## 3. 常见高级算法

### 递归

#### 斐波那契数列

前两个数都为1，从第三个数字开始是前两个数字之和。

```js
function fibonacci(n){
  // 要求n是大于0的整数
  if(n < 3){
    return 1
  }else{
    return fibonacci(n-1) + fibonacci(n-2)
  }
}
fibonacci(1)  // 1
fibonacci(2)  // 1
fibonacci(3)  // 2
fibonacci(6)  // 8

```

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/cba8ffcab2f2d6a3eeb6953dd7eec54e.png)

#### 阶乘数列

当前数等于从1开始乘，一直乘到当前数字。例如：f(3)=1*2*3

```js
function factorial(n){
  // 要求n是大于0的整数
  if(n == 1){
    return 1
  }else{
    return factorial(n-1) * n
  }
}
factorial(1)  // 1
factorial(2)  // 2
factorial(3)  // 6
factorial(4)  // 24
factorial(5)  // 120

```

### 分治法

它将一个复杂的问题分解成多个相对简单且独立的子问题，然后递归地解决这些子问题，最后将其合并得到原问题的解，具体步骤为：
分解（Divide）：将原问题划分成多个相同或相似的子问题。这一步骤通常利用递归实现。
解决（Conquer）：递归地解决子问题。如果子问题足够小，可以直接求解。
合并（Combine）：将子问题的解合并成原问题的解。
例如：归并排序、快速排序

### 动态规划

思路：`确定状态转移方程`，`相同问题在不同规模状态下的关系`

步骤：

1. 找到**相同问题（重叠子问题）**

   「相同问题」必须能适配不同规模

2. 找到重叠子问题之间的**关系**

3. 找到重叠子问题**特殊解**

它将一个复杂的问题分解成多个相互关联的子问题，通过反复求解子问题，来解决原来的问题。
常见动态规划问题有：斐波那契数列，爬楼梯，打家劫舍，背包问题，最长公共子序列问题，硬币找零，图的全源最短路径。

#### 斐波那契数列

优化：准备数组`dp表` ---> `降维打击`,只记录前两个值

```js
Function fibonacci(n){
	if(n <= 2){
    return 1
  }
  let p1 = 1;
  let p2 = 1;
  let r = 1;
  for(let i = 2; i < n; i++){
    r = p1 + p2;
    p2 = p1;
    p1 = r;
  }
  return r;
}
```



#### 最长公共子序列问题

#### 基础：不同路径（Leetcode.62）

<img src="/Users/zhangchaoqun/Library/Application Support/typora-user-images/image-20240920102907343.png" alt="image-20240920102907343" style="zoom:50%;" />

思路：

> `状态转移方程`：
>
> `dp(i, j)`=`dp(i-1, j)`+`dp(i, j-1)`
>
> 当i == 0 || j == 0, `dp(i, j)`=1

```js
//递归，但是会超时，因为有重复求解
let uniquePaths = function(m, n){
  let dp = (i, j)=>{
    if(i === 0 || j === 0){
      return 1
    } else {
      return dp(i, j - 1) + dp(i - 1, j)
    }
  }
  return dp(m - 1, n - 1)
}
```

```js
//优化版递归，加入缓存，但是效率仍然很低
let uniquePaths = function(m, n){
  const cache = {};
  let dp = (i, j)=>{
    if(i === 0 || j === 0){
      return 1
    } 
    const key = `${i}-${j}`
    if(cache[key]){
      return cache[key]
    }
      return (cache[key] = dp(i, j - 1) + dp(i - 1, j))
  }
  return dp(m - 1, n - 1)
}
```

```js
//循环
let uniquePaths = function(m, n){
  const result = [];
  for (let i = 0; i < m; i++) {
    result.push([])
    for (let j = 0; j < n; j++) {
      if (i === 0 || j === 0) {
        result[i][j] = 1
      } else {
        result[i][j] = result[i - 1][j] + result[i][j - 1]
      }
    }
  }
  return result[m - 1][n - 1]
}
```

#### 后效性问题：地下城游戏(Leetcode.174)

动态规划要保证`无后效性`

<img src="/Users/zhangchaoqun/Library/Application Support/typora-user-images/image-20240920112130016.png" alt="image-20240920112130016" style="zoom:50%;" />

```js
dp[i][j] = max((min(dp[i][j+1], dp[i+1][j]) - dungeon[i][i]),1)
```

从右下角开始填，填到左上角

```js
let calculateMinimumHP = function (dungeon){
  const r = dungeon.length,
        c = dungeon[0].length;
  const dp = new Array(r + 1).fill(0).map(() => new Array(c + 1).fill(Infinity));
  dp[r][c - 1] = dp[r - 1][c] = 1
  for (let i = r - 1; i >= 0; i--) {
    for (let j = c - 1; j >= 0; j--) {
      dp[i][j] = Math.max(Math.min(dp[i][j + 1], dp[i + 1][j]) - dungeon[i][j], 1)
    }
  }
  return dp[0][0]
}
```

#### 最优解问题：打家劫舍（Leetcode.198）

你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

**示例 1：**

```
输入：[1,2,3,1]
输出：4
解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。
```

**示例 2：**

```
输入：[2,7,9,3,1]
输出：12
解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
     偷窃到的最高金额 = 2 + 9 + 1 = 12 。
```

`dp[i]`=`max(num[i] + dp[i - 2], dp[i - 1])`

即`取i`的情况和`不取i`的情况

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  if (nums.length === 0) return 0;
  let dp = [];
  for (let i = 0; i <= nums.length; i++) {
    if (i === 0) {
      dp[i] = nums[i]
    } else if (i === 1) {
      dp[i] = Math.max(nums[i], nums[i - 1])
    } else {
      dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1])
    }
  }
  return dp[nums.length - 1]
};
```





#### 01背包问题（Leetcode.2548）

![image-20240920092004712](/Users/zhangchaoqun/Library/Application Support/typora-user-images/image-20240920092004712.png)

`价值`、`重量`、`物品`三个维度--->`二维数组`来表示

![image-20240920092109912](/Users/zhangchaoqun/Library/Application Support/typora-user-images/image-20240920092109912.png)

每个格子表示`dp[i][j]`

在物品下标`0~i`之间选择物品不超过`j`所得到的最优解

在选或不选中间选择一个最优解，问题可以转化为`dp[i][j] = max(选第i件物品, 不选第i件物品)`

`不选第i件物品`=`dp[i-1][j]`

`选第i件物品`=`value[i]+dp[i-1][j-weight[i]]`

> 优化：空间复杂度为`O(n*bagWeight)`
>
> 不用二维数组，使用滚动二维表格。

先计算`第一行`指向`result`，根据第一行算第二行，把`result`指向`第二行`

公式可优化为：

`next[j]` = max(`value[i]+result[j - weight[i]]`, `result[j]`)

> 空间复杂度变为O(bagWeight)

```js
function package(bagWeight, value, weight){
  let result = [];
  //init first time
  for(let j = 0; j <= bagWeight; j++){
    result[j] = j >= weight[0] ? value[0] : 0;
  }
  for(let i = 1; i < value.length; i++){
    const next = [];
      for(let j = 0; j <= bagWeight; j++){
        if(j >= weight[i]){
          next[j] = Math.max(value[i] + result[j - weight[i]], result[j])
        } else {
          next[j] = result[j]
        }
      }
    result = next
  }
  return result[bagWeight]
}
const result = package(6, [5, 10, 3, 6, 3], [2, 5, 1, 4, 5])
console.log(result)
```



#### 爬楼梯问题

`爬楼梯问题`：假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

```js
// 动态规划，爬楼梯
// 示例 1：
// 输入：n=2
// 输出：2
// 解释：有两种爬楼梯的方法：
// 1. 1 阶 + 1 阶
// 2. 2 阶

// 示例 2：
// 输入：n = 3
// 输出：3
// 解释：有三种方法可以爬到楼顶。
// 1. 1 阶 + 1 阶 + 1 阶
// 2. 1 阶 + 2 阶
// 3. 2 阶 + 1 阶

// 解题思路：可以假设在第n-1个台阶爬一个台阶，或者在第n-2个台阶爬两个台阶。则问题就变为了：f(n)=f(n-1) + f(n-2)
// f(n-1) 为爬到第n-1个台阶的办法，f(n-2)为爬到第n-2个台阶的办法
// 时间复杂度O（n）
// 空间复杂度O（n）
function climbStairs(n){
  // 规定n是大于等于1的正整数
  if(n==1){
    return 1
  }else{
    // 存放f(n)的数组
    let dp = [1,1]
    for(let i=2;i<=n;i++){
      dp[i] = dp[i-1] + dp[i-2]
    }
    return dp[n]
  }
}

// 优化算法：变量替换数组
// 时间复杂度O（n）
// 空间复杂度O（1）
function climbStairs(n){
  if(n==1) return 1
  let dp0 = 1,dp1 = 1
  for(let i=2;i<=n;i++){
    [dp0, dp1] = [dp1, dp0 + dp1]
  }
  return dp1
}
climbStairs(5)  // 8
climbStairs(8)  // 34

```

#### 取值问题

`取值问题`：在不同时经过两个相邻房间的情况下，能够获取到的最多钱财

```js
// 示例 1：
// 输入：[1,2,3,1]
// 输出：4
// 解释：1 号房屋 (金额 = 1) ，然后 3 号房屋 (金额 = 3)。
//      获取到的最高金额 = 1 + 3 = 4 。

// 示例 2：
// 输入：[2,7,9,3,1]
// 输出：12
// 解释：1 号房屋 (金额 = 2), 3 号房屋 (金额 = 9)，接着5 号房屋 (金额 = 1)。
//      获取到的最高金额 = 2 + 9 + 1 = 12 。

// 解题思路：到第 k 间房能获取到的最大金额，应该是前 k-2 间房获取到的最大金额加上第 k 间房的金额。
// 或者是 前 k-1 间房获取到的最大金额。
// 最终结果就是这两种情况下取最大值。
// f(k): 前 k 间房获取的最大值，a(k): 第 k 间房的金额。
// f(k) = Math.max(f(k-2) + a(k), f(k-1))
function getmoney(list){
  if(list.length == 0)return 0
  // 存放能获取到的最大金额的数组,i表示房间数
  let dp = [0, list[0]]
  for(let i=2;i<=list.length;i++){
    dp[i] = Math.max(dp[i-2] + list[i-1], dp[i-1])
  }
  return dp[list.length]
}
getmoney([2,5,3,1,9,4,7,6])  // 21
getmoney([2,8,3,1,9,4,7,6])  // 24

```

### 贪心算法

期望通过每一个阶段的局部最优解，从而得到全局最优解(只是一种期望，实际上可能并不能得到全局最优解)。它不像动态规划那样计算更大的格局。

**贪心算法和动态规划的异同：**
**相同点：**

- 两者都有最优子结构，以及贪心选择策略（贪心）或重叠子问题（dp）。

- 可以理解贪心算法是特殊的动态规划算法。

**不同点：**

- 贪心算法应用的范围较少，求解的是`局部最优解`。每一个阶段的最优解`依赖于上一个阶段`。最后得到的解是所有局部最优解的推断，并不一定是全局最优解，求解过程较快，是一种`自上而下`的求解过程。
- 动态规划类似于穷举法，求解所有可行解，最后通过回溯法获取全局最优解
- 贪心算法求解过程：
  将所有候选解按一定规则排序；
  根据贪心选择策略（某个循环实现）判断个是否选择到最优解中。
- 动态规划求解过程：
  ①将所有于问题的可行解存储在一个列表中；
  ②循环写递推式（可用递归写的部分）
  ③使用回溯法推出最优解。

#### 找零问题

```js
const coinArr = [1,0.5,5,2,10,50,20,100]
const amount = 43
function changeAmount(coins, amount){
  // 把钱币面额数组从大到小排序
  coins.sort((a,b)=>b-a)
  // 存储找零结果
  let result = []
  for (let i = 0;i<coinArr.length;i++){
    while(amount>=coins[i]){
      // 将最大面值放进数组
      result.push(coinArr[i])
      // 减去已经找零的金额
      amount -= coinArr[i]
    }
  }
  // 能找开的时候amount一定是等于零的
  if(amount>0){
    return '找不开零钱'
  }
  return result
}
console.log(changeAmount(coinArr,amount));

```

## 4. 字符串算法

### 字符串匹配

#### 思路

1. 将`模式串`和`主串`进行比较
   - 从前往后比较
   - 从后往前比较
2. 匹配时，比较`主串`和`模式串`的下一个位置
3. 失配时,
   - 在`模式串`中寻找一个合适的位置
     - 如果找到，从这个位置开始与`主串`当前失配位置进行比较
     - 如果未找到，从`模式串`的头部与`主串`失配位置的下一个位置进行比较
   - 在`主串`中找到一个合适的位置，重新与`模式串`进行比较

 `BF` 和 `KMP` 算法，都是属于规规矩矩从前向后的操作，后者仅在**寻找`模式串`的合适位置**上进行了优化，而 `BM` 算法的操作就显得骚了很多，它的优化点在于：

1. 从后往前比较
2. 失配时，寻找的是`主串`中合适的位置

#### KMP算法

[字符串匹配](https://en.wikipedia.org/wiki/String_searching_algorithm)是计算机的基本任务之一。

举例来说，有一个字符串"BBC ABCDAB ABCDABCDABDE"，我想知道，里面是否包含另一个字符串"ABCDABD"？

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050101.jpg)

许多算法可以完成这个任务，[Knuth-Morris-Pratt算法](https://en.wikipedia.org/wiki/Knuth–Morris–Pratt_algorithm)（简称KMP）是最常用的之一。它以三个发明者命名，起头的那个K就是著名科学家Donald Knuth。

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050102.jpg)

这种算法不太容易理解，网上有很多[解释](https://www.google.com/search?q=Knuth-Morris-Pratt+algorithm)，但读起来都很费劲。直到读到[Jake Boxer](http://jakeboxer.com/blog/2009/12/13/the-knuth-morris-pratt-algorithm-in-my-own-words/)的文章，我才真正理解这种算法。下面，我用自己的语言，试图写一篇比较好懂的KMP算法解释。

1.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050103.png)

首先，字符串"BBC ABCDAB ABCDABCDABDE"的第一个字符与搜索词"ABCDABD"的第一个字符，进行比较。因为B与A不匹配，所以搜索词后移一位。

2.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050104.png)

因为B与A不匹配，搜索词再往后移。

3.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050105.png)

就这样，直到字符串有一个字符，与搜索词的第一个字符相同为止。

4.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050106.png)

接着比较字符串和搜索词的下一个字符，还是相同。

5.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050107.png)

直到字符串有一个字符，与搜索词对应的字符不相同为止。

6.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050108.png)

这时，最自然的反应是，将搜索词整个后移一位，再从头逐个比较。这样做虽然可行，但是效率很差，因为你要把"搜索位置"移到已经比较过的位置，重比一遍。

7.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050107.png)

一个基本事实是，当空格与D不匹配时，你其实知道前面六个字符是"ABCDAB"。KMP算法的想法是，设法利用这个已知信息，不要把"搜索位置"移回已经比较过的位置，继续把它向后移，这样就提高了效率。

8.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050109.png)

怎么做到这一点呢？可以针对搜索词，算出一张《部分匹配表》（Partial Match Table）。这张表是如何产生的，后面再介绍，这里只要会用就可以了。

9.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050107.png)

已知空格与D不匹配时，前面六个字符"ABCDAB"是匹配的。查表可知，最后一个匹配字符B对应的"部分匹配值"为2，因此按照下面的公式算出向后移动的位数：

> 　　移动位数 = 已匹配的字符数 - 对应的部分匹配值

因为 6 - 2 等于4，所以将搜索词向后移动4位。

10.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050110.png)

因为空格与Ｃ不匹配，搜索词还要继续往后移。这时，已匹配的字符数为2（"AB"），对应的"部分匹配值"为0。所以，移动位数 = 2 - 0，结果为 2，于是将搜索词向后移2位。

11.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050111.png)

因为空格与A不匹配，继续后移一位。

12.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050112.png)

逐位比较，直到发现C与D不匹配。于是，移动位数 = 6 - 2，继续将搜索词向后移动4位。

13.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050113.png)

逐位比较，直到搜索词的最后一位，发现完全匹配，于是搜索完成。如果还要继续搜索（即找出全部匹配），移动位数 = 7 - 0，再将搜索词向后移动7位，这里就不再重复了。

14.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050114.png)

下面介绍《部分匹配表》是如何产生的。

首先，要了解两个概念："前缀"和"后缀"。 "前缀"指除了最后一个字符以外，一个字符串的全部头部组合；"后缀"指除了第一个字符以外，一个字符串的全部尾部组合。

15.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050109.png)

"部分匹配值"就是"前缀"和"后缀"的最长的共有元素的长度。以"ABCDABD"为例，

> 　　－　"A"的前缀和后缀都为空集，共有元素的长度为0；
>
> 　　－　"AB"的前缀为[A]，后缀为[B]，共有元素的长度为0；
>
> 　　－　"ABC"的前缀为[A, AB]，后缀为[BC, C]，共有元素的长度0；
>
> 　　－　"ABCD"的前缀为[A, AB, ABC]，后缀为[BCD, CD, D]，共有元素的长度为0；
>
> 　　－　"ABCDA"的前缀为[A, AB, ABC, ABCD]，后缀为[BCDA, CDA, DA, A]，共有元素为"A"，长度为1；
>
> 　　－　"ABCDAB"的前缀为[A, AB, ABC, ABCD, ABCDA]，后缀为[BCDAB, CDAB, DAB, AB, B]，共有元素为"AB"，长度为2；
>
> 　　－　"ABCDABD"的前缀为[A, AB, ABC, ABCD, ABCDA, ABCDAB]，后缀为[BCDABD, CDABD, DABD, ABD, BD, D]，共有元素的长度为0。

16.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050112.png)

"部分匹配"的实质是，有时候，字符串头部和尾部会有重复。比如，"ABCDAB"之中有两个"AB"，那么它的"部分匹配值"就是2（"AB"的长度）。搜索词移动的时候，第一个"AB"向后移动4位（字符串长度-部分匹配值），就可以来到第二个"AB"的位置。

#### BF算法

BF 算法，Brute-Force(暴力)法的简称，完全没有优化，每次失配时从`主串`的下一个位置进行比较，直到比较结束。

算法描述如下：

1. 将`模式串`和`主串`**从前往后比较**
2. 匹配时，比较`主串`和`模式串`的下一个位置
3. 失配时，从`主串`的**下一个位置**开始与`模式串`的头部重新开始比较

我们假设有 **主串 ABABBBAAABABABBA** 和 **模式串 ABABABB** ， 下面放五张图来理解一下这个过程：

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/12/16f98cdaf4c9315d~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)





![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/12/16f98ce0835443c0~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)



上面这两幅图，表现的是第1步和第2步，可以看出：

1. 从 `S[0]` 和 `P[0]` 开始从头往后比较
2. 如果匹配，比较`S[i++]`和`S[j++]`



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/12/16f98d3a99e77270~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)





![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/12/16f98d3d0dc4ba4d~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)



上面这两幅图，则表现的时第3步，可以看出：

1. 如果 `S[i]` 和 `P[j]` 失配
2. `j = 0` 从 `P[0]` 也就是`模式串`头部开始与`主串`的**下一个位置**`S[i - (j - 1)]`开始继续进行匹配

重复上述两步，直到下图完全匹配或者找不到模式串为止



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/12/16f98da305f349e4~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)





思路还是很好理解的，但是代码怎么写呢？ 其实我一直觉得刷 `LeetCode` 除了巩固与提高**数据结构与算法**的能力之外，最重要的就是训练一种**把思路翻译成代码的能力**，下面我来尝试翻译一下上述的算法思路。

##### 先进行极端情况的排除



<img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/12/16f98e62ac0ec5d5~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp" alt="img" style="zoom:33%;" />



这个操作应该是刷题刷多了，像以前做数学题写“解”的操作

##### 写出整体的结构

1. 从算法的思路很容易看出，这里的“重复上诉两步”，明显是要翻译成循环操作
2. 如果是循环，那么终止条件是什么，可以很快想到，只有两种终止情况：
   - `主串`中没有找到 `模式串`的匹配，此时 `i = haystack.length`
   - `主串`中找到了`模式串`的匹配，此时 `j = needle.length`
3. 算法处理过程主要是两步，所以这里一定有一个分支结构
   - 匹配
   - 失配
4. 如果没找到，直接 `return -1` 就好了，但要是找到了，应该怎么确定那个 `index` 的值呢？根据上面成功的图，我们可以发现，匹配的位置 `8`，是等于 `主串`的末尾 `14` 减去 `模式串`的末尾 `6` 得到的，也就是最后匹配的那个 `index = i - j`



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/12/16f98f14640cfab8~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)



##### 补充具体操作

根据算法分析里的描述，很容易知道

1. 匹配，`i++; j++;` 比较各自的下一位
2. 失配，`i = i - (j - 1); j = 0;`重新进行下一轮匹配



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/12/16f98f562d99dd29~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)



至此，整个BF算法的分析与编写就完成了，虽然它是一个毫无优化的结构，但是体现出了所有字符串匹配算法的基本思想，计算机不是人，可以通过眼睛观察和大脑思考来进行定位，它只能通过一个一个字符的比较来进行判定，接下来的算法，就开始运用到一些骚操作来进行优化这个匹配的过程。

#### BM算法

##### 阮一峰版本介绍

------

KMP算法并不是效率最高的算法，实际采用并不多。各种文本编辑器的"查找"功能（Ctrl+F），大多采用Boyer-Moore算法。

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050301.jpg)

Boyer-Moore算法不仅效率高，而且构思巧妙，容易理解。1977年，德克萨斯大学的Robert S. Boyer教授和J Strother Moore教授发明了这种算法。

下面，我根据Moore教授自己的[例子](http://www.cs.utexas.edu/~moore/best-ideas/string-searching/fstrpos-example.html)来解释这种算法。

1.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050302.png)

假定字符串为"HERE IS A SIMPLE EXAMPLE"，搜索词为"EXAMPLE"。

2.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050303.png)

首先，"字符串"与"搜索词"头部对齐，从尾部开始比较。

这是一个很聪明的想法，因为如果尾部字符不匹配，那么只要一次比较，就可以知道前7个字符（整体上）肯定不是要找的结果。

我们看到，"S"与"E"不匹配。这时，**"S"就被称为"坏字符"（bad character），即不匹配的字符。**我们还发现，"S"不包含在搜索词"EXAMPLE"之中，这意味着可以把搜索词直接移到"S"的后一位。

3.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050304.png)

依然从尾部开始比较，发现"P"与"E"不匹配，所以"P"是"坏字符"。但是，"P"包含在搜索词"EXAMPLE"之中。所以，将搜索词后移两位，两个"P"对齐。

4.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050305.png)

我们由此总结出**"坏字符规则"**：

> 　　后移位数 = 坏字符的位置 - 搜索词中的上一次出现位置

如果"坏字符"不包含在搜索词之中，则上一次出现位置为 -1。

以"P"为例，它作为"坏字符"，出现在搜索词的第6位（从0开始编号），在搜索词中的上一次出现位置为4，所以后移 6 - 4 = 2位。再以前面第二步的"S"为例，它出现在第6位，上一次出现位置是 -1（即未出现），则整个搜索词后移 6 - (-1) = 7位。

5.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050306.png)

依然从尾部开始比较，"E"与"E"匹配。

6.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050307.png)

比较前面一位，"LE"与"LE"匹配。

7.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050308.png)

比较前面一位，"PLE"与"PLE"匹配。

8.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050309.png)

比较前面一位，"MPLE"与"MPLE"匹配。**我们把这种情况称为"好后缀"（good suffix），即所有尾部匹配的字符串。**注意，"MPLE"、"PLE"、"LE"、"E"都是好后缀。

9.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050310.png)

比较前一位，发现"I"与"A"不匹配。所以，"I"是"坏字符"。

10.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050311.png)

根据"坏字符规则"，此时搜索词应该后移 2 - （-1）= 3 位。问题是，此时有没有更好的移法？

11.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050309.png)

我们知道，此时存在"好后缀"。所以，可以采用**"好后缀规则"**：

> 　　后移位数 = 好后缀的位置 - 搜索词中的上一次出现位置

举例来说，如果字符串"ABCDAB"的后一个"AB"是"好后缀"。那么它的位置是5（从0开始计算，取最后的"B"的值），在"搜索词中的上一次出现位置"是1（第一个"B"的位置），所以后移 5 - 1 = 4位，前一个"AB"移到后一个"AB"的位置。

再举一个例子，如果字符串"ABCDEF"的"EF"是好后缀，则"EF"的位置是5 ，上一次出现的位置是 -1（即未出现），所以后移 5 - (-1) = 6位，即整个字符串移到"F"的后一位。

这个规则有三个注意点：

> 　　（1）"好后缀"的位置以最后一个字符为准。假定"ABCDEF"的"EF"是好后缀，则它的位置以"F"为准，即5（从0开始计算）。
>
> 　　（2）如果"好后缀"在搜索词中只出现一次，则它的上一次出现位置为 -1。比如，"EF"在"ABCDEF"之中只出现一次，则它的上一次出现位置为-1（即未出现）。
>
> 　　（3）如果"好后缀"有多个，则除了最长的那个"好后缀"，其他"好后缀"的上一次出现位置必须在头部。比如，假定"BABCDAB"的"好后缀"是"DAB"、"AB"、"B"，请问这时"好后缀"的上一次出现位置是什么？回答是，此时采用的好后缀是"B"，它的上一次出现位置是头部，即第0位。这个规则也可以这样表达：如果最长的那个"好后缀"只出现一次，则可以把搜索词改写成如下形式进行位置计算"(DA)BABCDAB"，即虚拟加入最前面的"DA"。

回到上文的这个例子。此时，所有的"好后缀"（MPLE、PLE、LE、E）之中，只有"E"在"EXAMPLE"还出现在头部，所以后移 6 - 0 = 6位。

12.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050312.png)

可以看到，"坏字符规则"只能移3位，"好后缀规则"可以移6位。所以，**Boyer-Moore算法的基本思想是，每次后移这两个规则之中的较大值。**

更巧妙的是，这两个规则的移动位数，只与搜索词有关，与原字符串无关。因此，可以预先计算生成《坏字符规则表》和《好后缀规则表》。使用时，只要查表比较一下就可以了。

13.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050313.png)

继续从尾部开始比较，"P"与"E"不匹配，因此"P"是"坏字符"。根据"坏字符规则"，后移 6 - 4 = 2位。

14.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050314.png)

从尾部开始逐位比较，发现全部匹配，于是搜索结束。如果还要继续查找（即找出全部匹配），则根据"好后缀规则"，后移 6 - 0 = 6位，即头部的"E"移到尾部的"E"的位置。

------

##### 掘金版本

------

###### 坏字符规则

运用坏字符规则，在算法里主要体现在生成一张散列表，**表的key值是字符集里每个字符的ASCII码值，value值是模式串中该字符的位置**，举个栗子：



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbdd06325d58dd~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)



假设字符串的字符集不是很大，用长度为`256`的数组来存储，并且初值赋值为`-1`。数组的下标对应字符的 `ASCII` 码值，数组中存储这个字符在模式串中出现的位置。这里要特别说明一点，如果坏字符在模式串里多处出现，选择最靠后的那个，因为这样不会让模式串滑动过多，导致本来可能匹配的情况被滑动略过。

###### 好后缀规则

好后缀规则体现在如何求出 `suffix` 和 `prefix` 两个数组以及`移动规则`。

**suffix 数组**

key值表示的是**后缀子串的长度**，value值表示的是在`模式串`中跟好后缀 S 相匹配的**最后一个**子串 S' 的首字母在`模式串`中的key值，如下图：



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbdedbe78e8f37~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)



**prefix 数组**

同样的，key值表示的是**后缀子串的长度**，而value值表示的是`模式串`中，是否有和该长度下后缀子串相同的前缀子串，是的话为 `true`，否则为 `false`，如下图：



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbdfaaa93141c1~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)



**移动规则**

移动规则总结如下：

- 在`模式串`中寻找跟好后缀 S 相匹配的最后一个子串 S'
  - 如果找到，将`模式串`移动到使得 S' 和`主串`对齐的位置
  - 如果找不到，再寻找`模式串`的`前缀子串`中是否有和 `好后缀 S` 的`后缀子串`匹配的位置，滑动`模式串`以对齐。
  - 如果仍然找不到，则将`模式串`移动至`主串`与`模式串`末尾对齐的下一个位置

下图分别对应三种情况：



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbe1256299dac9~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)





![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbe21169ea6537~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)





![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/19/16fbe25d424e5799~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

参考字符串匹配的思路

- 仍然需要进行`主串`和`模式串`的字符对比，所以需要**两个指针 `i` ，`j` 分别指向`主串`和`模式串`，记录位置**
- 需要一个循环来重复进行匹配操作，此时思考终止条件：
  - `i` 指向`主串`每次匹配的合适位置，从前往后扫描；`j` 指向`模式串`的尾部，从后往前扫描。考虑极端情况：**`主串`和`模式串`对比完，仍然无法匹配**。此时，`i` 的位置一定小于等于 **`主串`长度 `n` 与`模式串`长度 `m` 的差值**。具体可看下图。
- 每次`模式串`从后往前与`主串`进行匹配，这也需要一个内层循环来驱动指针`j`
- 如果匹配，只需要继续移动匹配位置即可
- 如果失配，分别根据`坏字符规则`和`好后缀规则`计算出 `i` 需要移动的位置，选择两个值当中最大的，重新计算 `i` 的值，重复进行匹配。

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/20/16fc2f1e6dd915c9~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

求坏字符散列表

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/20/16fc2fd945775ad4~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

**求好后缀记录数组 `suffix` 和 `prefix`**

拿下标从 `0` 到 `i` 的子串（`i` 可以是 `0` 到 `m-2`）与整个模式串，求公共后缀子串。如果公共后缀子串的长度是 `k`，那就记录 `suffix[k]=j`（`j` 表示公共后缀子串的起始下标）。如果 j 等于 `0`，也就是说，公共后缀子串也是模式串的前缀子串，就记录 `prefix[k]=true`。可以自己动下手，模拟下代码的运行，尤其注意中`k`值的运用，很巧妙。

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/20/16fc30f6f14ba77b~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

**求好后缀移动步数**

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/20/16fc315bd6ea85fc~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

#### RK指纹查找算法

hash

#### Sunday算法

- 从`主串`和`模式串`的首位开始比较，记
  - 主串 `S`
  - 模式串 `P`
  - 主串长度 `slen`
  - 模式串长度 `plen`
  - 主串位置指针 `i`
  - 模式串位置指针 `j`
  - 每次重新匹配时，模式串尾部对应主串位置的下一位 `m`
- 判断` S[i]`与` P[j]`是否相等
  - 如果相等
    - 判断 `j` 与 `plen-1` 是否相等，如果相等则表示 表示模式串匹配完成，直接返回 `i - j` 即可
    - 如果不相等，则继续比较下一位，即 `i++;j++;`
  - 如果不相等
    - 查看 `S[m]` 字符是否存在于 `P` 中，如果存在，将 `P` 移至两字符对应的位置上
    - 如果不存在，则移至 `S[m]` 的后一位
- 如果移动后， `m > slen` ，说明 `S` 已经遍历一遍，仍然没有找到目标，`模式串` 匹配失败。

初始状态，`i = 0, j = 0, m = 4`



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/23/16fd27c8af91d92e~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)



------

比较 `S[0]` 和 `P[0]`，发现不相等，看 `S[4]` 处发现并没有在 `P` 中出现



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/23/16fd27ca2bd21514~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)



------

直接将 `P` 移至 `S[4]` 的后一位，此时 `i = 5, j = 0, m = 9`



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/23/16fd27cc9a9cd38c~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)



------

比较 `S[5]` 和 `P[0]`，发现不相等，看 `S[9]` 处发现有在 `P` 中出现



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/23/16fd27e84fdeabcf~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)



------

将 `P` 中的 `i` 与 `S` 中的 `i` 对齐，此时 `i = 8, j = 0, m = 12`



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/23/16fd280f09a76fd6~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)



------

比较 `S[8]` 和 `P[0]`，发现不相等，看 `S[12]` 处发现并没有在 `P` 中出现



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/23/16fd28363ff3311e~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)



------

直接将 `P` 移至 `S[12]` 的后一位，此时 `i = 13, j = 0, m = 17`



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/23/16fd2855a44c5f64~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)



------

比较 `S[13]` 和 `P[0]`，发现不相等，看 `S[17]` 处发现有在 `P` 中出现



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/23/16fd2870756afca7~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)



------

将 `P` 中的 `n` 与 `S` 中的 `n` 对齐，此时 `i = 15, j = 0, m = 18`



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/23/16fd289c858aac6a~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)



------

继续匹配，直到 `j === plen - 1 = 3`，则匹配成功，得到结果 `i - j = 18 - 3 = 15`



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/23/16fd28d60d2d6403~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

##### 极端情况的排除



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/23/16fd2a29690234cf~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)



##### 整体逻辑框架

- 首先，肯定有一个循环，先找到终结条件，和 `BF算法` 一样，查找顺序也是从前往后，可以很快知道，`i < slen` 就是终结的条件
- 其次，就是要对匹配和失配进行不同的处理

由此，我们就可以写出整体的框架：



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/23/16fd2a3eeffc8df7~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)



##### 细节的完善

```js

```





![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/23/16fd2a500d122669~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

## 5. 其他算法

### LRU缓存算法

`Least Recently Used`:最久未使用缓存算法

```typescript
class LRUCache{
  #cache;
  constructor(capacity){
    this.capacity = capacity
    this.#cache = new Map()
  }
  has(key){
    return this.#cache.has(key)
  }
  get(key){
    if(!this.#cache.has(key)){
      return
    }
    const value = this.#cache.het(key)
    this.#cache.delete(key)
    this.#cache.set(key, value)
    return value
  }
  set(key, value){
    if(this.#cache.has(key)){
      this.#cache.delete(key)
    } else if (this.#cache.size >= this.capacity){
      this.#cache.delete(this.#cache.keys().next().value)
    }
    this.#cache.set(key, value)
  }
}
```

# 四. Javascript常用数据结构与方法

## 运算符

### 相等

[JavaScript 中的相等性判断](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)

- [`===`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Strict_equality)——严格相等（三个等号）
- [`==`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Equality)——宽松相等（两个等号）
- [`Object.is()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is)

选择哪个运算取决于你需要什么样的比较。简单来说：

- 在比较两个操作数时，双等号（`==`）将执行类型转换，并且会按照 IEEE 754 标准对 `NaN`、`-0` 和 `+0` 进行特殊处理（故 `NaN != NaN`，且 `-0 == +0`）；
- 三等号（`===`）做的比较与双等号相同（包括对 `NaN`、`-0` 和 `+0` 的特殊处理）但不进行类型转换；如果类型不同，则返回 `false`；
- `Object.is()` 既不进行类型转换，也不对 `NaN`、`-0` 和 `+0` 进行特殊处理（这使它和 `===` 在除了那些特殊数字值之外的情况具有相同的表现）。

上述三个操作分别与 JavaScript 四个相等算法中的三个相对应：

- [IsLooselyEqual](https://tc39.es/ecma262/#sec-islooselyequal)：`==`
- [IsStrictlyEqual](https://tc39.es/ecma262/#sec-isstrictlyequal)：`===`
- [SameValue](https://tc39.es/ecma262/#sec-samevalue)：`Object.is()`
- [SameValueZero](https://tc39.es/ecma262/#sec-samevaluezero)：被许多内置运算使用

请注意，这些算法的区别都与它们对原始类型值的处理有关；它们都不会比较参数是否具有理论上相似的结构。对于任何具有相同的结构，但不是同一对象本身的非原始类型对象 `x` 和 `y` ，上述所有形式都将计算为 `false`。

**严格相等运算符**（`===`）会检查它的两个操作数是否相等，并且返回一个布尔值结果。与相等`==`运算符不同，严格相等运算符总是认为不同类型的操作数是不同的。

严格相等运算符（`===` 和 `!==`）提供了严格相等判定语义。

- 如果操作数的类型不同，则返回 false。
- 如果两个操作数都是对象，只有当它们指向同一个对象时才返回 true。
- 如果两个操作数都为 null，或者两个操作数都为 undefined，返回 true。
- 如果两个操作数有任意一个为 NaN，返回 false。
- 否则，比较两个操作数的值：
  - 数字类型必须拥有相同的数值。+0 和 -0 会被认为是相同的值。
  - 字符串类型必须拥有相同顺序的相同字符。
  - 布尔运算符必须同时为 true 或同时为 false。

严格相等运算符与相等（==）运算符最显著的区别是，如果操作数的类型不同，== 运算符会在比较之前尝试将它们转换为相同的类型。

**相等**（**`==`**）运算符检查其两个操作数是否相等，返回一个布尔值结果。与严格相等运算符不同，它会尝试转换不同类型的操作数，并进行比较。

相等运算符（`==` 和 `!=`）提供非严格相等使用_进行宽松相等比较)语义。这可以大致总结如下：

1. 如果操作数具有相同的类型，则按如下方式进行比较：
   - 对象（Object）：仅当两个操作数引用同一个对象时返回 `true`。
   - 字符串（String）：仅当两个操作数具有相同的字符且顺序相同时返回 `true`。
   - 数字（Number）：如果两个操作数的值相同，则返回 `true`。`+0` 和 `-0` 被视为相同的值。如果任何一个操作数是 `NaN`，返回 `false`；所以，`NaN` 永远不等于 `NaN`。
   - 布尔值（Boolean）：仅当操作数都为 `true` 或都为 `false` 时返回 `true`。
   - 大整型（BigInt）：仅当两个操作数的值相同时返回 `true`。
   - 符号（Symbol）：仅当两个操作数引用相同的符号时返回 `true`。
2. 如果其中一个操作数为 `null` 或 `undefined`，另一个操作数也必须为 `null` 或 `undefined` 以返回 `true`。否则返回 `false`。
3. 如果其中一个操作数是对象，另一个是原始值，则将对象转换为原始值。
4. 在这一步，两个操作数都被转换为原始值（字符串、数字、布尔值、符号和大整型中的一个）。剩余的转换将分情况完成。
   - 如果是相同的类型，使用步骤 1 进行比较。
   - 如果其中一个操作数是符号而另一个不是，返回 `false`。
   - 如果其中一个操作数是布尔值而另一个不是，则将布尔值转换为数字：`true` 转换为 1，`false` 转换为 0。然后再次对两个操作数进行宽松比较。
   - 数字与字符串：将字符串转换为数字。转换失败将导致 `NaN`，这将保证相等比较为 `false`。
   - 数字与大整型：按数值进行比较。如果数字的值为 ±∞ 或 `NaN`，返回 `false`。
   - 字符串与大整型：使用与 `BigInt()` 构造函数相同的算法将字符串转换为大整型数。如果转换失败，返回 `false`。

宽松相等是*对称的*：`A == B` 对于 `A` 和 `B` 的任何值总是具有与 `B == A` 相同的语义（应用转换的顺序除外）。

该运算符与严格相等（`===`）运算符之间最显著的区别是，严格相等运算符不尝试类型转换。相反，严格相等运算符总是认为不同类型的操作数是不同的。严格相等运算符本质上只执行第 1 步，然后对所有其他情况返回 `false`。

上面的算法有一个“故意违反”：如果其中一个操作数是 `document.all`，则它被视为 `undefined`。这意味着 `document.all == null` 是 `true`，但 `document.all === undefined && document.all === null` 是 `false`。



## 1. Array

### 改变数组

`push()`：尾部插入

`unshift()`：头部插入

`fill()`：填充

`pop()`：尾部删除

`shift()`：头部删除

`splice()`：原数组：splice(start, deleteCount, item1, item2, /* …, */ itemN)就地移除或者替换已存在的元素和/或添加新的元素

`toSpliced()`：新数组版本`splice()`

`copyWithin()`：copyWithin(target, start, end) ，从target开始替换arr中start到end的元素

`with()`：方括号赋值`arr.with(index, value)`等价为`arr[index] = value`

### 数组转字符串

`toString()`：返回一个由该数组所有元素以`,`拼接成的字符串，该方法其实是在内部调用了`Array.join(',')`方法。

`join()`：使用自定义字符把数组合并为字符串

### 迭代器

#### 原数组

`forEach()`：对数组的每个元素执行一次给定的函数。

`every()`：测试一个数组内的所有元素是否都能通过指定函数的测试。它返回一个布尔值。判断版`filter()`

`some()`：测试数组中是否至少有一个元素通过了由提供的函数实现的测试。它返回一个布尔值。

`reduce()`：累计。`reduce(fn(上次返回值, 当前值, 当前索引, arr), 初始值)`

`reduceRight()`：从右往左的reduce()

#### 新数组

`filter()`：返回一个通过所提供函数实现的测试的所有元素的新数组，筛选版`every()`

`map()`：新数组版`forEach()`

#### 迭代键值

`entries()`：迭代键值 arr.entries().next().value ---> Array [0, "a"]

`keys()`：迭代键 Object [Array Iterator] {}

`values()`：迭代值 Object [Array Iterator] {}

### 排序和翻转

`sort()`：排序，传入fn按照fn的逻辑排序

`toSorted()`：新数组版`sort()`

`reverse()`：翻转

`toReversed()`：新数组版`reverse()`

### 切分与合并

`concat()`：合并数组`arr1.concat(arr2)`

`slice()`：切分数组，返回一个新的数组对象，这一对象是一个由 start 和 end 决定的原数组的浅拷贝（包括 start，不包括 end）

### 查找

`at()`：查找索引对应元素。

`find()`：返回数组中满足提供的测试函数的第一个元素的值，否则返回 undefined。

`findLast()` ：方法反向迭代数组，并返回满足提供的测试函数的第一个元素的值。如果没有找到对应元素，则返回 undefined。

`includes()`：判断一个数组是否包含一个指定的值，包含则返回 true，否则返回 false。

`indexOf()`：返回数组中给定元素第一次出现的索引

`lastIndexOf()`：返回数组中给定元素最后一次出现的索引

`findIndex()`：返回数组中给定索引的元素

`findLastIndex()`：反向迭代数组，并返回满足所提供的测试函数的第一个元素的索引。若没有找到对应元素，则返回 -1。

### 数组扁平化

`flat()`：创建一个新的数组，并根据指定深度递归地将所有子数组元素拼接到新的数组中

`flatMap()`：对数组中的每个元素应用给定的回调函数，然后将结果展开一级，返回一个新数组。它等价于在调用 `map()`方法后再调用深度为 1 的 `flat()`方法（`arr.map(...args).flat()`），但比分别调用这两个方法稍微更高效一些。

### 创建

`new Array(n)`

`Array.from()` ：Array.from({length:n})会填充undefined 

`Array.of() ` ：Array.of({length:n})不会填充undefined

#### 字符串转数组

`String.prototype.split()`：字符串切分

`Array.from(str)`：

`([...str])`：展开

`Object.assign([], str)`：

`Array.prototype.slice.call('string')`：切分

`(for loop 和 array.push())`：遍历

### 判断

`Array.isArray()`：确定传递的值是否是一个数组【最准确】

`typeof arr === "object" && arr instanceof Array`

`Object.prototype.toString.call(arr) === [object Array]`

## 2. String

`valueOf()`：返回 String 对象的原始值。

### 改变字符串

`replace()`：字符串中字符替换,变量名.replace("替换前的字符","替换后的字符")，使用字面量匹配只替换一个，使用正则可以全部替换;

`replaceAll()`：全部替换

`trim()`：清空首尾空格

`trimStart()`：清理首部空格

`trimEnd()`：清理尾部空格

`toUpperCase()`：大写

`toLowerCase()`：小写

`toLocaleUpperCase()`：本地大写

`toLocaleLowerCase()`：本地小写

`padStart()`：用另一个字符串填充当前字符串（如果需要会重复填充），直到达到给定的长度。填充是从当前字符串的开头开始的。

`padEnd()`：用另一个字符串填充当前字符串（如果需要会重复填充），直到达到给定的长度。填充是从当前字符串的结尾开始的。

### 查找

`at()`：接受一个整数值，并返回一个新的 String，该字符串由位于指定偏移量处的单个 UTF-16 码元组成。该方法允许正整数和负整数。负整数从字符串中的最后一个字符开始倒数。如果找不到指定的索引，则返回 undefined。

`charAt()`：获取字符串指定下标的字符

`indexOf()`：查询字符串指定字符下标,变量名.indexOf("要查询下标位置的字符",查询起始位置)

`lastIndexOf()`：反向查询字符串指定字符下标

`search()`：返回指定字符串的位置,支持正则匹配

`includes()`：查询字符串是否包含指定字符，返回布尔值（boolean），返回 true 为包含，返回 false 为不包含

`startsWith()`：判断当前字符串是否以另外一个给定的子字符串开头，并根据判断结果返回 `true` 或 `false`。

`endsWith()`：判断当前字符串是否以另外一个给定的子字符串结尾

`match()`：检索字符串与正则表达式进行匹配的结果。

`matchAll()`：返回一个迭代器，该迭代器包含了检索字符串与正则表达式进行匹配的所有结果（包括捕获组）

`localeCompare()` 方法返回一个数字，表示参考字符串在排序顺序中是在给定字符串之前、之后还是与之相同。在支持 `Intl.Collator` API的实现中，该方法仅是调用了 `Intl.Collator` 方法。当比较大量字符串时，例如对大型数组进行排序，最好创建一个 `Intl.Collator`对象，并使用其 `compare()`方法提供的函数。

`isWellFormed()`方法返回一个表示该字符串是否包含单独代理项的布尔值。

### 字符串转数组

`split()`：拆分字符串，返回一个数组，变量名.split("分隔符");

### 字符集

`normalize()`：返回该字符串的 Unicode 标准化形式。

`charAt()`方法返回一个由给定索引处的单个 UTF-16 码元构成的新字符串。`charAt()` 方法总是将字符串作为UTF-16 码元序列进行索引，因此它可能会返回孤项代理。要获取给定索引处的完整 Unicode 码位，请使用 `String.prototype.codePointAt()`和 `String.fromCodePoint()`。

`codePointAt()`方法返回一个非负整数，该整数是从给定索引开始的字符的 Unicode 码位值。`charCodeAt()`方法返回一个整数，表示给定索引处的 UTF-16 码元，其值介于 `0` 和 `65535` 之间。

`charCodeAt()` 方法总是将字符串当作 UTF-16 码元序列进行索引，因此它可能返回单独代理项（lone surrogate）。如果要获取给定索引处的完整 Unicode 码位，请使用`String.prototype.codePointAt()`方法。

### 切分与合并

`concat()`：合并字符串

`slice()`：字符串截取,变量名.slice(起始下标，结束下标)

`substring()`：返回该字符串从起始索引到结束索引（不包括）的部分，如果未提供结束索引，则返回到字符串末尾的部分。

### 创建

`new String('xxxx')`--->`object`

`String('xxxx')`--->`string`

`let str = 'xxxx'`--->`string`

`repeat()`：构造并返回一个新字符串，其中包含指定数量的所调用的字符串副本，这些副本连接在一起。

## 3. Number

### 转换

`toExponential()`：科学计数法

`toFixed()`：小数位数

`toLocaleString()`：本地字符串

`toPrecision()`：指定长度

`toString()`：转化为字符串

`valueOf()`：String 的 valueOf() 方法以字符串数据类型返回 String 对象的原始值。此值等价于 String.prototype.toString()。此方法通常由 JavaScript 在内部调用，而不是在代码中显式调用。

`Number.parseFloat()`：解析参数并返回浮点数。如果无法从参数中解析出一个数字，则返回 NaN。

`Number.parseInt()`：解析一个字符串参数并返回一个指定基数的整数。

### 常量

`Number.EPSILON`：表示 1 与大于 1 的最小浮点数之间的差值。2-52，或大约 2.2204460492503130808472633361816E-16。通常建议不要使用 `===` 比较浮点数*。相反，我们可以认为两个数在彼此之间是足够接近的时候它们是相等的。如果算术运算的数量级在 `1` 附近，那么 `Number.EPSILON` 常数通常是一个合理的误差阈值，因为实质上，`EPSILON` 指定了数字“1”的精确度。对于任何具有更大数量级的算术运算，`Number.EPSILON` 是不适用的。如果你的数据数量级在 103 的范围，那么小数部分的精确度将远远小于`Number.EPSILON`。由于进行比较的数字的数量级大约为 `2000`，使用类似于 `2000 * Number.EPSILON` 的乘积可以为此情况提供足够的容差。

`Number.MAX_SAFE_INTEGER`：表示在 JavaScript 中最大的安全整数（253 – 1）。对于更大的整数，请考虑使用 BigInt。BigInt是一种内置对象，它提供了一种方法来表示大于 2^53 - 1 的整数。这原本是 Javascript 中可以用Number表示的最大数字。BigInt可以表示任意大的整数。

`Number.MAX_VALUE`：表示的最大数值。21024 - 1，或大约 1.7976931348623157E+308。大于 MAX_VALUE 的值表示为 Infinity并将丢失其实际值。

`Number.MIN_SAFE_INTEGER`：在 JavaScript 中最小的安全整数（-253 – 1）。要表示比这小的整数，请考虑使用 BigInt。-9007199254740991（-9,007,199,254,740,991，或大约 -9 千万亿）。

`Number.MIN_VALUE`：JavaScript 中可表示的最小正数值。2-1074，或 5E-324。

`Number.NaN`：表示非数字值，等同于 NaN。

`Number.NEGATIVE_INFINITY`：表示负无穷值。与全局属性Infinity的负值相同。

`Number.POSITIVE_INFINITY`：表示正无穷大值。与全局属性 Infinity 的值相同。

<img src="/Users/zhangchaoqun/Library/Application Support/typora-user-images/image-20240924090436373.png" alt="image-20240924090436373" style="zoom: 25%;" />

### 判断

`Number.isFinite()`

`Number.isInteger()`

`Number.isNaN()`

`Number.isSafeInteger()`

## 4. object&Object

`{}`包含了除了`null`跟`undefined`所有的类型

```js
function test(param:{}){}
test(1) √
test({}) √
test("foo") √
test({name:"foo"}) √

test(null) ×
test(undefined) ×
```

(这也是`{}`跟`unknown`的区别，`unknown`可以包含`null`跟`undefined`)

但是它对它所指向的对象一无所知，访问任何属性或者方法都会报找不到：

```javascript
let obj:{} = {}
obj = {name:"foo"}

let foo = obj.name ×
```

其实整个类型系统都是如此，类型表示值的集合。在我们日常coding过程中，时不时会遇到`Argument of type 'xxx' is not assignable to parameter of type 'xxx'.`的报错，其实就是看我们要赋的值在不在我们声明的对象的集合里面。（比如`"foo"|"bar"`这种`literal type`可以赋给接受`string`类型的变量）。

`Object`类似于`{}`，所有拥有`Object`原型的值都能赋给`Object`作为类型的变量。

规则，值的原型里得有`Object`（JS的大部分值都是有的）。它所指向的对象一无所知，访问任何属性或者方法都会报找不到。`Object`对于对象里的某些方法是有要求的(比如`Object`原型对象的`toString`方法)：

```js
let okObj:{} = {
  toString(){ √
    return false
  }
}
let okObj:Object = {
  toString(){ ×
    return false
  }
}
```

这里`Object`就不能用了，而`{}`没有这种检查。

`object`跟`{}`有一点不同，它不包含原始类型(数字、字符串、布尔)。除了这一点，其它的跟`{}`很相似。

1. 用于一些复合对象的情况，选`object`
2. 复合对象跟原始类型皆可的情况，选`{}`
3. 如果要包含`null`跟`undefined`的情况，用`unknown`

------

### 改变

`Object.setPrototypeOf()`：可以将一个指定对象的原型设置为另一个对象或者 null。Object.setPrototypeOf(obj, prototype)

`Object.defineProperty()`：定义新属性、修改现有属性、精确控制属性特性和实现属性访问器

`Object.defineProperties()`：批量定义新属性、修改现有属性、精确控制属性特性和实现属性访问器

`Object.groupBy()`：分组。允许你基于提供的回调函数对可迭代对象（如数组）中的元素进行分组。最终会生成一个新的对象，该对象的每个属性都是一个组，每个组中包含属于该组的元素数组。object.groupBy()函数返回一个无原型的对象，该对象的每个属性都是一个组，每个组分配给包含相关组元素的数组。就像一个精心组织的文件柜，为你的数据提供完美的分类和管理。

```javascript
Object.groupBy(items, callbackFn)
```

- items：一个可迭代对象（如数组），包含你想要分组的元素。

- callbackFn：一个回调函数，对每个元素执行。这个函数应该返回一个可以转换为属性键（字符串或符号）的值，指示当前元素所属的组。


回调函数callbackFn的参数包括：

- element：当前正在处理的元素。

- index：当前正在处理的元素的索引。


### 迭代器

#### 改变原对象



#### 新对象或不改变原对象

`Object.keys()`

`Object.values()`

`Object.entries()`

### 切分与合并

`Object.assign()`：将一个或者多个源对象中所有可枚举的自有属性复制到目标对象，并返回修改后的目标对象。

### 查找

`Object.getPrototypeOf()`：获取原型

`Object.getOwnPropertyNames()`：获取自有属性名

`Object.getOwnPropertyDescriptors()`：法返回给定对象的所有自有属性描述符。

`Object.getOwnPropertyDescriptor()`：返回一个对象，该对象描述给定对象上特定属性（即直接存在于对象上而不在对象的原型链中的属性）的配置。返回的对象是可变的，但对其进行更改不会影响原始属性的配置。

`Object.getOwnPropertySymbols()`：返回一个包含给定对象所有自有 Symbol 属性的数组。

### 转换

`toString()`：返回一个表示该对象的字符串。JavaScript 调用 `toString` 方法将对象转换为一个原始值。

- `Object.prototype.toString()` 返回 `"[object Type]"`，这里的 `Type` 是对象的类型。如果对象有 [`Symbol.toStringTag`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) 属性，其值是一个字符串，则它的值将被用作 `Type`。许多内置的对象，包括 [`Map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map) 和 [`Symbol`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)，都有 `Symbol.toStringTag`。一些早于 ES6 的对象没有 `Symbol.toStringTag`，但仍然有一个特殊的标签。
  - `Array`
  - `Function`（它的 `typeof`返回 `"function"`）
  - `Error`
  - `Boolean`
  - `Number`
  - `String`
  - `Date`
  - `RegExp`
- `arguments` 对象返回 `"[object Arguments]"`。其他所有内容，包括用户自定义的类，除非有一个自定义的 `Symbol.toStringTag`，否则都将返回 `"[object Object]"`。
- 在 `null`和 `undefined`上调用 `Object.prototype.toString()` 分别返回 `[object Null]` 和 `[object Undefined]`。

`toLocaleString()`

### 创建

`new Object()`：构造函数将输入转换为一个对象。它的行为取决于输入的类型。 `Object()` 可以在带有或者不带有 `new`的情况下调用，但有时会产生不同的效果。

当调用或者构造 `Object()` 构造函数本身时，其返回值是一个对象：

- 如果该值是 `null`或者 `undefined`，它会生成并返回一个空对象。
- 如果该值已经是一个对象，则返回该值。
- 否则，它将返回与给定值对应的类型的对象。例如，传递 `BigInt` 基本类型会返回一个 `BigInt` 封装对象。

当通过继承Object的类的构造函数中的super()隐式调用 Object()时，它以 new.target.prototype为原型初始化一个新对象。传递给 super() 的任意值都将被忽略——例如，即使你传递一个数字，构造函数中的 this值也不会变成 Number实例。

```js
class newObject extends Object {
  constructor() {
    super();
  }
}
let obj1 = new Object("hello");
let obj2 = new newObject("hello");
console.log(`obj1:${obj1}, obj2:${obj2}`);
console.log(obj2);

//obj1:hello, obj2:[object Object]
//newObject {}
```



`Object()`：构造函数将输入转换为一个对象。它的行为取决于输入的类型。

`Object.create()`：以一个现有对象作为原型，创建一个新对象。

`Object.fromEntries()`：将键值对列表转换为一个对象。Object.fromEntries(iterable)，Array或者Map。`Object.fromEntries()` 是 `Object.entries()`的逆操作。与 `Array.from()`不同的是，`Object.fromEntries()` 不使用 `this` 的值，因此在另一个构造函数上调用它不会创建该类型的对象。

```js
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42],
]);
const obj = Object.fromEntries(entries);
console.log(obj);
// Expected output: Object { foo: "bar", baz: 42 }
```



### 密封、冻结与扩展

⭐️⭐️⭐️`Object.freeze()`：使一个对象被*冻结*。冻结对象可以防止扩展，并使现有的属性不可写入和不可配置。被冻结的对象不能再被更改：不能添加新的属性，不能移除现有的属性，不能更改它们的可枚举性、可配置性、可写性或值，对象的原型也不能被重新指定。`freeze()` 返回与传入的对象相同的对象。是 JavaScript 提供的最高完整性级别保护措施。

`Object.isFrozen()`

⭐️⭐️`Object.seal()`：*密封*一个对象。密封一个对象会阻止其扩展并且使得现有属性不可配置。

`Object.isSealed()`

⭐️`Object.preventExtensions()`：可以防止新属性被添加到对象中（即防止该对象被扩展）。它还可以防止对象的原型被重新指定。

`Object.isExtensible()`

### 判断

[JavaScript 中的相等性判断](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)

`Object.is()`：判断两个值是否相等【最正确，与arr.isArray()为最正确判断】

`Object.hasOwn()`：如果指定的对象*自身*有指定的属性，则静态方法 Object.hasOwn()返回 `true`。如果属性是继承的或者不存在，该方法返回 `false`。`Object.hasOwn()` 旨在取代 `Object.prototype.hasOwnProperty()`。

`isPrototypeOf()`：用于检查一个对象是否存在于另一个对象的原型链中。

- `isPrototypeOf()` 与 `instanceof`运算符不同。在表达式 `object instanceof AFunction` 中，会检查 `object` 的原型链是否与 `AFunction.prototype` 匹配，而不是与 `AFunction`本身匹配。

`hasOwnProperty()`

`propertyIsEnumerable()`：方法返回一个布尔值，表示指定的属性是否是对象的可枚举自有属性。

- 可枚举属性是指那些内部“可枚举”标志设置为 true 的属性，对于通过直接的赋值和属性初始化的属性，该标识值默认为即为 true，对于通过 Object.defineProperty等定义的属性，该标识值默认为false。可枚举的属性可以通过 for...in循环进行遍历（除非该属性名是一个 [Symbol]。属性的所有权是通过判断该属性是否直接属于某个对象决定的，而不是通过原型链继承的。一个对象的所有的属性可以一次性的获取到。有一些内置的方法可以用于判断、迭代/枚举以及获取对象的一个或一组属性，下表对这些方法进行了列举。

## 5. Map

- `Map` 允许非字符串类型的键，而 `Object` 的键只能是字符串或符号。
- `Map` 保持键值对的插入顺序，`Object` 没有顺序。
- `Map` 的原型上没有默认的方法或属性，不会像 `Object` 那样继承原型链上的属性。
- `WeakMap`：类似于 `Map`，但其键必须是对象，并且键对值的引用是弱引用，这意味着如果没有其他引用，键值对会被垃圾回收。`WeakMap` 不支持迭代。

### 创建

`new Map()`：

### 改变

`get()`：根据键获取对应的值。如果键不存在，则返回 `undefined`。

`set()`：添加或更新键值对。map.set('key', 'value');

`delete()`：删除某个键值对，成功删除返回 `true`，否则返回 `false`。

`clear()`：清空所有键值对。

### 查找

`has()`：检查 `Map` 中是否存在某个键。

### 迭代器

`forEach()`：

`entries()`：

`keys()`：

`values()`：

## 6. Set

### 修改

`add()`：在该集合中插入一个具有指定值的新元素，如果该 Set对象中没有具有相同值的元素。

`delete()`：从该集合中删除指定值，如果该值在集合中。

`clear()`：移除该集合中的所有元素。

### 合并

`union()`：合并set

`intersection()`：接受一个集合并返回一个新的集合，其中包含当前集合中和给定集合中都存在的所有元素。set1.intersection(set2)

`difference()`：接受一个集合并返回一个新的集合，其中包含当前集合中存在但给定集合中不存在的所有元素。set1.difference(set2)

### 查找

`has()`：返回一个布尔值来指示对应的值是否存在于该集合中。

### 判断

`isSupersetOf()`：判断set1是否为set2的父集。set1.isSupersetOf(set2)

`isSubsetOf()`：判断set1是否为set2的子集。set1.isSubsetOf(set2)

`isDisjointFrom()`：接受一个集合并返回一个布尔值来指示当前集合与给定集合是否不存在公共元素。

### 迭代器

`forEach()`：

`entries()`：

`keys()`：

`values()`：

## 7. Function

### 改变this指向

`apply()`

`call()`

`bind()`

## 8. 其他

# 五. TypeScript数据类型与工具类型

## 1.基础类型

number

string

boolean

Symbol()

Array<Type> type[]

enum

any

unknown

tuple

void

null

undefined

object

Object

{}

never

## 2.方法

1.断言

类型断言：尖括号和as

非空断言：！

确定赋值断言

2.类型守卫

in

typeof

instanceof

is

3.联合类型与类型别名

4.交叉类型

5.类

6.泛型

7.装饰器

## 3.工具类型

Partial<Type>

Required<Type>

Readonly<Type>

Record<Keys, Type>

Pick<Type, Keys>

Exclude<UnionType, ExcludedMembers>

Extract<Type, Union>

Omit<Type, Keys>

NonNullable<Type>

Parameters<Type>

ConstructorParameters<Type>

ReturnType<Type>

InstanceType<Type>

Awaited<Type>

ThisParameterType<Type>

OmitThisParameter<Type>

ThisType<Type>

ReadonlyArray<Type>

Uppercase<StringType>

Lowercase<StringType>

Capitalize<StringType>

Uncapitalize<StringType>
