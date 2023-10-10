class DoublyLinkedListNode {
    constructor(value, next= null, previous= null) {
        this.value = value;
        this.next = next;
        this.previous = previous;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    prepend(value) {
        const newNode = new DoublyLinkedListNode(value, this.head);

        if (this.head) {
            this.head.previous = newNode;
        }

        this.head = newNode;

        if (!this.tail) {
            this.tail = newNode;
        }

        return this;
    }

    append(value) {
        const newNode = new DoublyLinkedListNode(value)

        if (this.tail) {
            this.tail.next = newNode;
        }

        newNode.previous = this.tail;

        this.tail = newNode;

        if (!this.head) {
            this.head = newNode
        }
    }

    delete(value) {
        if (!this.head) {
            return null;
        }

        let deletedNode = null;
        let currentNode = this.head;

        while (currentNode) {
            if (currentNode.value === value) {
                deletedNode = currentNode;
                if (deletedNode === this.head) {
                    this.head = deletedNode.next;

                    if (this.head) {
                        this.head.previous = null;
                    }

                    if (deletedNode === this.tail) {
                        this.tail = null;
                    }
                } else if (deletedNode === this.tail) {
                    this.tail = deletedNode.previous
                    this.tail.next = null;
                } else {
                    const previousNode = deletedNode.previous;
                    const nextNode = deletedNode.next;

                    previousNode.next = nextNode;
                    nextNode.previous = previousNode;
                }
            }
            currentNode = currentNode.next;
        }
        return deletedNode;
    }

    find(value) {
        if (!this.head) {
            return null;
        }

        let currentNode = this.head;
        while (currentNode) {
            if (value !== undefined && currentNode.value === value) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }
        return null;
    }

    deleteTail() {
        if (!this.tail) {
            return null;
        }

        const deletedTail = this.tail;

        if (this.tail.previous) {
            this.tail = this.tail.previous;
            this.tail.next = null;
        } else {
            this.head = null;
            this.tail = null;
        }

        return deletedTail;
    }

    deleteHead() {
        // Если нет head - список пуст.
        if (!this.head) {
            return null;
        }

          // Сохраняем значение первого узла.
        const deletedHead = this.head;

          // Если у head есть ссылка на следующий узел,
        if (this.head.next) {
            this.head = this.head.next;
            this.head.previous = null;
        } else {
            this.head = null;
            this.tail = null;
        }

        return deletedHead;
    }
    fromArray(values) {
        values.forEach(value => this.append(value));
        return this;
    }

    toArray() {
        const nodes = [];
        let currentNode = this.head;

        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    toString(callback) {
    return this.toArray()
    .map(node => node.toString(callback))
    .toString();
    }

    reverse() {
        let currNode = this.head;
        let prevNode = null;
        let nextNode = null;

        while (currNode) {
            nextNode = currNode.next;
            prevNode = currNode.previous;

            currNode.next = prevNode;

            currNode.previous = nextNode;


            prevNode = currNode;


            currNode = nextNode;
        }

        this.tail = this.head;


        this.head = prevNode;

        return this;
    }
}


