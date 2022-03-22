<script>
import getLineHeight from 'line-height'
import { ResizeObserver } from '@juggle/resize-observer'

export default {
  data() {
    return {
      isMounted: false,
      contentHeight: 0,
      lineHeight: 0,
    }
  },
  inject: ['passage'],
  props: ['every', 'testContentInjector'],
  computed: {
    lines() {
      // line calc requires mounted DOM
      const $content = this.$refs.content
      if (!this.isMounted || !$content) {
        return
      }

      const every = this.every ?? 1
      const byLine = every !== 'p'
      const lineCount = this.contentHeight / this.lineHeight
      // array of empty (undefined) line labels, length of total displayed line count
      const lines = Array.from({ length: lineCount })

      const linesEvery = (every) =>
        Array.from({ length: lineCount }, (_, i) => i + 1).filter(
          (i) => !(i % every)
        )
      const markOffset = (offset, value) => (lines[offset - 1] = String(value))

      const paragraphLineNumbers = () =>
        // find all paragraphs
        Array.from($content.getElementsByTagName('p'))
          // get distance from top of content
          .map(($p) => $p.offsetTop - $content.offsetTop)
          // calculate how many lines down it is
          .map((p) => p / this.lineHeight + 1)

      if (byLine) {
        linesEvery(every).forEach((offset) => markOffset(offset, offset))
      } else {
        paragraphLineNumbers().forEach((offset, index) =>
          markOffset(offset, index + 1)
        )
      }
      return lines
    },
  },
  mounted() {
    this.isMounted = true
    const $content = this.$refs.content

    // hook for testing different content
    if (this.testContentInjector) {
      this.testContentInjector.call(this, $content)
    }

    const updateLineRefs = () => {
      $content.querySelectorAll('a[id]').forEach(($ref) => {
        let line =
          this.every !== 'p'
            ? ($ref.offsetTop - $content.offsetTop) / this.lineHeight + 1
            : // TODO: assertions about the DOM structure
              Array.from($content.children).indexOf($ref.parentNode) + 1
        this.passage.references[$ref.getAttribute('id')] = Math.round(line)
      })
    }

    const updateView = () => {
      this.lineHeight = getLineHeight($content)
      this.contentHeight = $content.offsetHeight
      // TODO: only run once in p mode
      updateLineRefs()
    }

    const requestUpdate = animationCallback(updateView)
    const observeContentHeight = () => {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const newWidth = entry.contentBoxSize[0].blockSize
          if (newWidth !== this.contentHeight) {
            requestUpdate()
          }
        }
      })
      resizeObserver.observe(this.$refs.content)

      return () => {
        resizeObserver.disconnect()
      }
    }

    updateView()
    return observeContentHeight()
  },
}

/**
 * debounce multiple animationFrame requests,
 * tracking animationId state in the closure
 */
const animationCallback = (callback) => {
  let animationId
  return () => {
    if (animationId) window.cancelAnimationFrame(animationId)
    animationId = window.requestAnimationFrame(callback)
  }
}
</script>

<template>
  <div class="reading-passage">
    <div class="line-numbers">
      <div v-for="line in lines" v-bind:key="line">{{ line }}</div>
    </div>
    <div class="content" ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<style>
.reading-passage {
  display: flex;
}

.line-numbers {
  flex: 0 0;
  height: 100%;

  color: grey;
  font-size: 16px;
  font-style: italic;
  line-height: 20px;
  text-align: right;
  user-select: none;
}

.line-numbers div {
  min-height: 20px;
}

.content {
  height: 100%;
  margin: 0;
  padding-left: 1em;

  font-size: 20px;
  line-height: 20px;
}

.content p {
  text-indent: 1em;
  margin: 0;
}
</style>
