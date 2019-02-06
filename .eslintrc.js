const Path = require(`path`)
const isProduction = process.env.NODE_ENV === `production`

module.exports = {
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    parser: `@typescript-eslint/parser`,
    project: Path.join(__dirname, `./tsconfig.json`)
  },
  plugins: [`sort-imports-es6-autofix`],
  extends: [`plugin:vue/recommended`, `eslint:recommended`, `@vue/typescript`],
  rules: {
    // Add a warning when using console or debuggers during production.
    'no-console': isProduction ? 1 : 0,
    'no-debugger': isProduction ? 1 : 0,

    // Sort `import` statements.
    'sort-imports-es6-autofix/sort-imports-es6': [
      2,
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: [`all`, `multiple`, `single`, `none`]
      }
    ],

    // Forbid the use of `var`.
    'no-var': 2,

    // Prefer `const` over `let` whenever possible.
    'prefer-const': 2,

    // Only use `backticks` for quotes.
    quotes: [2, `backtick`, { avoidEscape: true }],

    // Use template literals.
    'prefer-template': 2,

    // Convert string concats to template literals.
    'no-useless-concat': 2,

    // Always use arrow parens in arrow functions.
    'arrow-parens': [2, `always`],

    // Dissallow unused variables.
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        varsIgnorePattern: `^_`,
        argsIgnorePattern: `^_`,
        args: `after-used`,
        ignoreRestSiblings: true
      }
    ],

    // Dissallow usage before definition.
    'no-undef': 0,
    '@typescript-eslint/no-use-before-define': 2,

    // Always prefix interfaces with a capital `I`.
    '@typescript-eslint/interface-name-prefix': `always`,

    // Force the usage of camelCase when naming things.
    camelcase: `off`,
    '@typescript-eslint/camelcase': [2, { properties: `always` }],

    // Force the usage of PascalCased when naming classes and/or interfaces.
    '@typescript-eslint/class-name-casing': 2,

    // Disallows explicit type declarations for variables where its type can be inferred.
    '@typescript-eslint/no-inferrable-types': 2,

    // Warns if a type assertion does not change the type of an expression.
    '@typescript-eslint/no-unnecessary-type-assertion': 2,

    // When adding two variables, operands must both be of type number or of type string.
    '@typescript-eslint/restrict-plus-operands': 2,

    // Add spacing after type annotation.
    '@typescript-eslint/type-annotation-spacing': 2,

    // Force the usage of `public`, `private`, etc.
    '@typescript-eslint/explicit-member-accessibility': 2,

    // Disable prefixing private vars with an `_`.
    '@typescript-eslint/member-naming': 0,

    // Dont force special order upon members.
    '@typescript-eslint/member-ordering': 0,

    // Delimit members with a line break or a comma.
    '@typescript-eslint/member-delimiter-style': [
      2,
      {
        singleline: { delimiter: `semi` },
        multiline: { delimiter: `none` }
      }
    ],

    // Set base indent of the script tags inside Vue files.
    'vue/script-indent': 2,

    // Use PascalCase for components
    'vue/component-name-in-template-casing': [2, `PascalCase`],

    // Force the use of self-closing elements.
    'vue/html-self-closing': [
      2,
      { html: { void: `always`, normal: `always`, component: `always` } }
    ],

    // One HTML attribute per line including the first line.
    'vue/max-attributes-per-line': [
      2,
      { singleline: 1, multiline: { max: 1, allowFirstLine: true } }
    ],

    // No new line after the closing bracket.
    'vue/html-closing-bracket-newline': [2, { singleline: `never`, multiline: `never` }],

    // Force space after self closing brackets.
    'vue/html-closing-bracket-spacing': [
      2,
      { startTag: `never`, endTag: `never`, selfClosingTag: `always` }
    ],

    // Force new line after multiline html elements.
    'vue/multiline-html-element-content-newline': 2,

    // Force new line after singleline html elements.
    'vue/singleline-html-element-content-newline': [2, { ignoreWhenNoAttributes: false }],

    // No whitespace between equal signs.
    'vue/no-spaces-around-equal-signs-in-attribute': 2,

    // Allow the vue `v-html` directive.
    'vue/no-v-html': 0
  }
}
