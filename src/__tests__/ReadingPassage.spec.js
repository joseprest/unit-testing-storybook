import { render, fireEvent } from '@testing-library/vue'
import { nextTick } from 'vue'
import ReadingPassage from '../ReadingPassage.vue'

const redefineProperty = ($el, propertyName, value) => {
  Object.defineProperty($el, propertyName, { writable: true })
  $el[propertyName] = value
}

const makeTestContentInjector = (contentText) => {
  return ($content) => {
    $content.style.setProperty('line-height', '20px')
    redefineProperty(
      $content,
      'offsetHeight',
      contentText.trim().split('\n').length * 20
    )
  }
}

describe('ReadingPassage', () => {
  test('renders single line numbers', async () => {
    const contentText = `\
<p>Line 1</p>
<p>Line 2</p>
`
    const { getByText, html } = render(ReadingPassage, {
      props: {
        testContentInjector: makeTestContentInjector(contentText),
      },
      slots: { default: contentText },
      global: {
        provide: {
          passage: {
            reset: () => null,
          },
        },
      },
    })

    await nextTick()

    expect(html()).toBe(`\
<div class="reading-passage">
  <div class="line-numbers">
    <div>1</div>
    <div>2</div>
  </div>
  <div class="content" style="line-height: 20px;">
    <p>Line 1</p>
    <p>Line 2</p>
  </div>
</div>`)
  })

  test('renders every 5 line numbers', async () => {
    const contentText = `\
<p>Line 1</p>
<p>Line 2</p>
<p>Line 3</p>
<p>Line 4</p>
<p>Line 5</p>
<p>Line 6</p>
`
    const { getByText, html } = render(ReadingPassage, {
      global: {
        provide: {
          passage: { reset: () => null },
        },
      },
      props: {
        every: 5,
        testContentInjector: makeTestContentInjector(contentText),
      },
      slots: {
        default: contentText,
      },
    })

    await nextTick()

    expect(html()).toBe(`\
<div class="reading-passage">
  <div class="line-numbers">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div>5</div>
    <div></div>
  </div>
  <div class="content" style="line-height: 20px;">
    <p>Line 1</p>
    <p>Line 2</p>
    <p>Line 3</p>
    <p>Line 4</p>
    <p>Line 5</p>
    <p>Line 6</p>
  </div>
</div>`)
  })

  test('renders every paragraph number', async () => {
    const contentText = `\
<p>Line 1<br/>is 40 high</p>
<p>Line 2</p>
<p>Line 3</p>
<p>Line 4</p>
<p>Line 5</p>
<p>Line 6</p>
`
    const { getByText, html } = render(ReadingPassage, {
      global: {
        provide: {
          passage: { reset: () => null },
        },
      },
      props: {
        every: 'p',
        testContentInjector: ($content) => {
          $content.style.setProperty('line-height', '20px')
          // default paragraph offsets
          const $ps = $content.getElementsByTagName('p')
          let offsetTop = 0
          Array.from($ps).forEach(($p, index) => {
            redefineProperty($p, 'offsetTop', offsetTop)
            if (index == 0) {
              offsetTop += 40
            } else {
              offsetTop += 20
            }
          })
          redefineProperty(
            $content,
            'offsetHeight',
            contentText.trim().split('\n').length * 20 + 20
          )
        },
      },
      slots: {
        default: contentText,
      },
    })

    await nextTick()

    expect(html()).toBe(`\
<div class="reading-passage">
  <div class="line-numbers">
    <div>1</div>
    <div></div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
  </div>
  <div class="content" style="line-height: 20px;">
    <p>Line 1<br>is 40 high</p>
    <p>Line 2</p>
    <p>Line 3</p>
    <p>Line 4</p>
    <p>Line 5</p>
    <p>Line 6</p>
  </div>
</div>`)
  })
})
