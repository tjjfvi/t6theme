function fromHex(x: string): [number, number, number] {
  return [
    parseInt(x.slice(1, 3), 16),
    parseInt(x.slice(3, 5), 16),
    parseInt(x.slice(5), 16),
  ]
}

function toHex(x: [number, number, number]) {
  return "#" + x.map((x) => (x | 0).toString(16).padStart(2, "0")).join("")
}

function lerp(a: string, b: string, t: number, u = 1 - t): string {
  return toHex(
    fromHex(a).map((x, i) => Math.sqrt((x ** 2) * u + (fromHex(b)[i] ** 2) * t)) as never,
  )
}

const black = "#151820"
const white = "#bdc3c7"
const darkgrey = "#252830"
const darkergrey = lerp(darkgrey, black, .5)

const grey = "#454850"
const lightgrey = "#656870"
const red = "#c0392b"
// const orange = "#d35400"
const yellow = "#f1c40f"
const green = "#2ecc71"
const blue = "#0984e3"
// const purple = "#8e44ad"

const comment = lerp(white, black, .66)

const keyword = "#5185ed"
const operator = keyword

const vague = lerp(white, black, .33)
const special = lerp("#679BFF", white, .1)
const self = "#569CD6"

const string = "#56ceff"
const constant = keyword

const code = vague

const none = "#00000000"

const error = lerp(red, white, .3, 1)
const warning = lerp(yellow, white, -.1, 1)

for (const N of [5, 6]) {
  const baseTokens = [
    scope("string", string),
    scope("meta.template.expression", white),
    scope("markup.fenced_code.block.markdown", code),
    scope("markup.fenced_code.block.markdown meta.embedded", white),
    scope("comment", comment),
    scope("keyword, storage.type", keyword),
    scope("keyword.other.crate, keyword.other.super, variable.language, entity.other.attribute-name.pseudo-class", self),
    scope("keyword.operator, storage.modifier, punctuation.definition.template-expression", operator),
    scope("keyword.operator.namespace, keyword.operator.access.dot", white),
    scope("meta.use entity.name.namespace, meta.use keyword.operator.namespace", vague),
    scope("entity.name.function", special),
    scope("support.type.primitive, entity.name.type, meta.type.parameters.ts punctuation, punctuation.definition.typeparameters", special),
    scope("entity.name.tag, punctuation.definition.tag", special),
    scope("constant.language, constant.numeric, support.constant", constant),
    scope("text.html.markdown punctuation.definition", comment),
    scope("markup.inline.raw, fenced_code.block.language", code),
    scope("meta.link.inline.markdown, meta.image.inline.markdown", comment),
    scope("punctuation.definition.lifetime, entity.name.type.lifetime", vague),
    scope("support.type.property-name.json", white),
    scope("entity.name.tag.css, entity.other.attribute-name.pseudo-element", keyword),
    scope("entity.other.attribute-name.class.css", special),
    scope("punctuation.decorator", special),
    scope("keyword.operator.assignment, punctuation.separator.key-value, punctuation.separator.comma", lerp(vague, comment, .2)),
    ...N === 5
      ? [
        scope("meta.object-literal.key, entity.other.attribute-name.tsx", lerp(white, string, .5)),
      ]
      : [],
  ]

  const theme = {
    $schema: "vscode://schemas/color-theme",
    type: "dark",
    colors: {
      "editor.background": black,
      "editor.foreground": white,
      "sideBar.background": darkergrey,
      "activityBar.background": darkgrey,
      "activityBarBadge.background": black,
      "tab.inactiveBackground": darkgrey,
      "tab.border": darkergrey,
      "editorGroupHeader.tabsBackground": darkergrey,
      "sideBarSectionHeader.background": darkgrey,
      "statusBar.background": darkgrey,
      "tab.activeForeground": white,
      "tree.indentGuidesStroke": none,
      "list.inactiveSelectionBackground": lerp(darkergrey, darkgrey, 2),
      "list.activeSelectionBackground": lerp(darkergrey, darkgrey, 2),
      "list.hoverBackground": darkgrey,
      "gitDecoration.modifiedResourceForeground": lerp(white, blue, .5),
      "gitDecoration.untrackedResourceForeground": lerp(white, green, .5),
      "errorForeground": error,
      "editorError.foreground": error + "90",
      "editorError.background": error + "28",
      "list.errorForeground": error,
      "editorWarning.foreground": warning + "80",
      "editorWarning.background": warning + "30",
      "list.warningForeground": warning,
      "editorInfo.foreground": white + "80",
      "editorWidget.background": darkgrey,
      "editorWidget.border": none,
      "editor.lineHighlightBackground": white + "10",
      "editor.lineHighlightBorder": none,
      "input.background": darkgrey,
      "checkbox.background": darkgrey,
      "checkbox.border": none,
      "dropdown.background": darkgrey,
      "focusBorder": grey,
      "editorLightBulb.foreground": lightgrey,
      "peekView.border": grey,
      "peekViewTitle.background": grey,
      "peekViewResult.background": darkgrey,
      "peekViewEditor.background": darkgrey,
      "peekViewResult.selectionBackground": grey,
    },
    "tokenColors": [
      { scope: "emphasis, markup.italic", settings: { fontStyle: "italic" } },
      { scope: "strong, markup.bold", settings: { fontStyle: "bold" } },
      {
        scope: "entity.other.attribute-name.id",
        settings: { fontStyle: "bold" },
      },
      {
        scope: "punctuation.definition.entity.css entity.other.attribute-name.id, keyword.other.important.css",
        settings: { fontStyle: "bold" },
      },
      { scope: "heading", settings: { fontStyle: "bold", foreground: blue } },
      ...baseTokens,
      scope("meta.embedded.block.rustdoc", comment),
      ...baseTokens.map((x) =>
        scope(
          x.scope.split(", ").map((x) => "meta.embedded.block.rustdoc " + x)
            .join(
              ", ",
            ),
          lerp(
            x.settings.foreground === code ? white : x.settings.foreground,
            black,
            .3,
          ),
        )
      ),
      scope("meta.embedded.block.rustdoc comment", comment),
      scope("meta.embedded.block.rustdoc comment", comment),
      {
        scope: "meta.embedded.block.rustdoc heading",
        settings: { fontStyle: "bold", foreground: comment },
      },
    ],
  }

  Deno.writeTextFile(
    `./themes/T${N}.json`,
    JSON.stringify(theme, null, 2),
  )
}

function scope(scope: string, foreground: string) {
  return { scope, settings: { foreground } }
}
