import { h, defineComponent, VNode } from 'vue'
import Reference from './Reference'

export default defineComponent({
  render() {
    const nodes = Array.from(this.$slots.default() as VNode[])
    return h('div', {}, replacePassageRefAsAnchorNode(nodes))
  },
})

const isPassageRefAsAnchorNode = (node: VNode) => node.type === 'a' && node.props.href.startsWith('#passage-')

function replacePassageRefAsAnchorNode(nodes: VNode[]) {
  const passageRefNodes = nodes.filter(isPassageRefAsAnchorNode)
  passageRefNodes.forEach(passageRefNode => {
    const nodeIndex = nodes.indexOf(passageRefNode)
    const refId = passageRefNode.props.href.slice(9)
    nodes[nodeIndex] = h(Reference, { refId }, null)
  })
  return nodes
}