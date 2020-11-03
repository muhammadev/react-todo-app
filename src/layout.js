export default function placeItems(parent) {
  let windowWidth = parent.getBoundingClientRect().width;
  let children = parent.children;
  children = Array.from(children);
  let childWidth = children[0].getBoundingClientRect().width; // all children has same width;
  let gap = 5; // gap between elements
  let actualWidth = childWidth + gap;

  let verticalCapacity = Math.floor((windowWidth - gap) / actualWidth);

  children.forEach((child, index) => {
    // get the order of current element in the row
    let neededSubs;
    let orderInRow;
    if (index < verticalCapacity) {
      orderInRow = 0;
      orderInRow = index + 1;
    }
    if (index >= verticalCapacity) {
      neededSubs = Math.floor(index / verticalCapacity);
      orderInRow = index;
      for (let i = 0; i < neededSubs; i++) {
        orderInRow -= verticalCapacity;
      }
      orderInRow += 1;
    }

    // get the order of current element in the row
    let orderInColumn = Math.ceil((index + 1) / verticalCapacity);

    let childHeight = 0;
    let horizontalSpace = 0;
    for (let i = 0; i < orderInColumn - 1; i++) {
      childHeight = children[
        index - verticalCapacity * (i + 1)
      ].getBoundingClientRect().height;
      horizontalSpace += childHeight;
    }

    let verticalSpace = childWidth * (orderInRow - 1) + gap * (orderInRow - 1);
    horizontalSpace = horizontalSpace + gap * (orderInColumn - 1);
    child.style.top = `${horizontalSpace}px`;
    child.style.left = `${verticalSpace}px`;
  });

  setTimeout(function () {
    let biggestTop = 0;
    let biggestHeight = 0;
    children.forEach((child) => {
      let coords = child.getBoundingClientRect();
      if (coords.top > biggestTop) {
        biggestTop = coords.top;
      }
      if (coords.height > biggestHeight) {
        biggestHeight = coords.height;
      }
    });
    let parentHeight =
      biggestTop - parent.getBoundingClientRect().top + biggestHeight + gap;
    parent.style.height = parentHeight + "px";
  }, 310);
}
