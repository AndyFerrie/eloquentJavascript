class Group {
  constructor() {
    this.members = [];
  }
  add(value) {
    if (!this.members.includes(value)) {
      this.members.push(value);
    }
  }
  delete(value) {
    this.members = this.members.filter((member) => member !== value);
  }
  static from(iterable) {
    let group = new Group();
    for (let value of iterable) {
      group.add(value);
    }
    return group;
  }
}
