# Flex Grid

http://foundation.zurb.com/sites/docs/flexbox.html
Built around two key elements: rows and columns. Rows create a max-width and contain the columns, and columns create the final structure. Everything on your page that you don't give a specific structural style to should be within a row or column.

### Nesting

In the Grid you can nest columns down as far as you'd like. Just embed rows inside columns and go from there. Each embedded row can contain up to 12 columns.

standard setup

```html
<div class="row display">
    <div class="columns">one-third</div>
    <div class="columns">one-third</div>
    <div class="columns">one-third</div>
</div>
```
<div class="row display">
    <div class="columns">one-third</div>
    <div class="columns">one-third</div>
    <div class="columns">one-third</div>
</div>

controlled size

<div class="row text-center display">
    <div class="small-6 columns">one half</div>
    <div class="columns">one quarter</div>
    <div class="columns">one quarter</div>
</div>

only take space needed (shrink) - make last col just take space of contents
<div class="row text-center display">
    <div class="small-6 columns">one half</div>
    <div class="columns">one quarter</div>
    <div class="shrink columns">one quarter</div>
</div>

## Stacking

Stacks on Small
<div class="row text-center display">
    <div class="small-12 medium-3 columns">space</div>
    <div class="small-12 medium-3 columns">space</div>
    <div class="small-12 medium-3 columns">space</div>
    <div class="small-12 medium-3 columns">space</div>
</div>

medium-expand and large-expand classes: The difference is that our columns will just expand to the space available, not just expand to a size we specify.
<div class="row text-center display">
    <div class="small-12 medium-expand columns">space</div>
    <div class="small-12 medium-expand columns">space</div>
    <div class="small-12 medium-expand columns">space</div>
    <div class="small-12 medium-expand columns">space</div>
</div>

## Horizontal Alignment

```html
<div class="row text-center align-center display display-col">
    <div class="small-3 columns">space</div>
    <div class="small-3 columns">space</div>
    <div class="small-3 columns">space</div>
</div>
```

align center (align-center)
<div class="row text-center align-center display display-col">
    <div class="small-3 columns">space</div>
    <div class="small-3 columns">space</div>
    <div class="small-3 columns">space</div>
</div>

align left (align-left)
<div class="row text-center align-left display display-col">
    <div class="small-3 columns">space</div>
    <div class="small-3 columns">space</div>
    <div class="small-3 columns">space</div>
</div>

align right (align-right)
<div class="row text-center align-right display display-col">
    <div class="small-3 columns">space</div>
    <div class="small-3 columns">space</div>
    <div class="small-3 columns">space</div>
</div>

align justified (align-justify)
<div class="row text-center align-justify display display-col">
    <div class="small-3 columns">space</div>
    <div class="small-3 columns">space</div>
    <div class="small-3 columns">space</div>
</div>

align spaced (align-spaced)
<div class="row text-center align-spaced display display-col">
    <div class="small-3 columns">space</div>
    <div class="small-3 columns">space</div>
    <div class="small-3 columns">space</div>
</div>

## Vertical Alignment

```html
<div class="row text-center align-middle display display-col">
    <div class="columns">space</div>
    <div class="columns">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</div>
</div>
```
align middle (align-middle)
<div class="row text-center align-middle display display-col">
    <div class="columns">space</div>
    <div class="columns">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</div>
</div>

align bottom (align-bottom)
<div class="row text-center align-bottom display display-col">
    <div class="columns">space</div>
    <div class="columns">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</div>
</div>

align stretch - the default equal height setting (align-stretch)
<div class="row text-center align-stretch display display-col">
    <div class="columns">space</div>
    <div class="columns">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</div>
</div>

vertical align on indavidual columns (use align-self in the columns)
<div class="row display">
  <div class="column align-self-bottom">Align bottom</div>
  <div class="column align-self-middle">Align middle</div>
  <div class="column align-self-top">Align top. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non harum laborum cum voluptate vel, eius adipisci similique dignissimos nobis at excepturi incidunt fugit molestiae quaerat, consequuntur porro temporibus. Nisi, ex?</div>
</div>

## Ordering

```html
<div class="row text-center align-stretch display display-col">
    <div class="column order-1 medium-order-2">This column comes first on small, second on medium and larger</div>
    <div class="column order-2 medium-order-1">This column comes second on small, first on medium and larger</div>
</div>
```
<div class="row text-center align-stretch display display-col">
    <div class="column order-1 medium-order-2">This column comes first on small, second on medium and larger</div>
    <div class="column order-2 medium-order-1">This column comes second on small, first on medium and larger</div>
</div>

## Flexbox helper classes

To make something a flex container, simply apply

.flex-container


And to change its flex direction from row to column you can use the helper classes:

.flex-dir-row (default)

.flex-dir-row-reverse

.flex-dir-column

.flex-dir-column-reverse


For children, there are 3 quick helper classes

.flex-child-auto (auto size flex child)

.flex-child-grow (flex child that will grow to take up all possible space)

.flex-child-shrink (flex child that will shrink to minimum possible space)

```html
<div class="row">
  <div class="column flex-container flex-dir-column">
    <div class="callout flex-child-auto">Auto</div>
    <div class="callout flex-child-auto">Auto</div>
    <div class="callout flex-child-shrink">Shrink</div>
  </div>
  <div class="column align-self-top">Align top. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non harum laborum cum voluptate vel, eius adipisci similique dignissimos nobis at excepturi incidunt fugit molestiae quaerat, consequuntur porro temporibus. Nisi, ex?Align top. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non harum laborum cum voluptate vel, eius adipisci similique dignissimos nobis at excepturi incidunt fugit molestiae quaerat, consequuntur porro temporibus. Nisi, ex?Align top. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non harum laborum cum voluptate vel, eius adipisci similique dignissimos nobis at excepturi incidunt fugit molestiae quaerat, consequuntur porro temporibus. Nisi, ex?
  </div>
</div>
```

<div class="row">
  <div class="column flex-container flex-dir-column">
    <div class="callout flex-child-auto">Auto</div>
    <div class="callout flex-child-auto">Auto</div>
    <div class="callout flex-child-shrink">Shrink</div>
  </div>
  <div class="column align-self-top">Align top. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non harum laborum cum voluptate vel, eius adipisci similique dignissimos nobis at excepturi incidunt fugit molestiae quaerat, consequuntur porro temporibus. Nisi, ex?Align top. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non harum laborum cum voluptate vel, eius adipisci similique dignissimos nobis at excepturi incidunt fugit molestiae quaerat, consequuntur porro temporibus. Nisi, ex?Align top. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non harum laborum cum voluptate vel, eius adipisci similique dignissimos nobis at excepturi incidunt fugit molestiae quaerat, consequuntur porro temporibus. Nisi, ex?
  </div>
</div>

---

# Colors

<p class="lead">Below you can find the different values we created that support the primary color variable you can change at any time in <code>\_settings.scss</code></p>

---

<div class="row up-1 medium-up-3 large-up-5">
  <div class="column">
    <div class="color-block">
      <span style="background: #2199e8"></span>
      #2199e8
    </div>
  </div>
  <div class="column">
    <div class="color-block">
      <span style="background: #3adb76"></span>
      #3adb76
    </div>
  </div>
  <div class="column">
    <div class="color-block">
      <span style="background: #ffae00"></span>
      #ffae00
    </div>
  </div>
  <div class="column">
    <div class="color-block">
      <span style="background: #ec5840"></span>
      #ec5840
    </div>
  </div>
  <div class="column">
    <div class="color-block">
      <span style="background: #0a0a0a"></span>
      #0a0a0a
    </div>
  </div>
</div>



# Typography

<p class="lead">This design uses Helvetica Neue for headings and paragraph text.</p>

---

## Headings

Headings are used to denote different sections of content, usually consisting of related paragraphs and other HTML elements. They range from h1 to h6 and should be styled in a clear hierarchy (i.e., largest to smallest)

---

## Paragraphs

Paragraphs are groups of sentences, each with a lead (first sentence) and transition (last sentence). They are block level elements, meaning they stack vertically when repeated. Use them as such.

---

<h1>Heading Level 1</h1>

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic quibusdam ratione sunt dolorum, qui illo maxime doloremque accusantium cum libero eum, a optio odio placeat debitis ullam aut non distinctio.

<h2>Heading Level 2</h2>

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic quibusdam ratione sunt dolorum, qui illo maxime doloremque accusantium cum libero eum, a optio odio placeat debitis ullam aut non distinctio.

<h3>Heading Level 3</h3>

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic quibusdam ratione sunt dolorum, qui illo maxime doloremque accusantium cum libero eum, a optio odio placeat debitis ullam aut non distinctio.

<h4>Heading Level 4</h4>

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic quibusdam ratione sunt dolorum, qui illo maxime doloremque accusantium cum libero eum, a optio odio placeat debitis ullam aut non distinctio.

<h5>Heading Level 5</h5>

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic quibusdam ratione sunt dolorum, qui illo maxime doloremque accusantium cum libero eum, a optio odio placeat debitis ullam aut non distinctio.

<h6>Heading Level 6</h6>

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic quibusdam ratione sunt dolorum, qui illo maxime doloremque accusantium cum libero eum, a optio odio placeat debitis ullam aut non distinctio.



# Buttons

<p class="lead">Buttons are tied to an action of some kind, whether that button is on a cheese dispenser or launches the rocket that you're strapped to. On the web, we follow similar conventions.</p>

---

## Primary Buttons

These buttons are primary calls to action and should be used sparingly. Their size can be adjusted with the `.tiny`, `.small`, and `.large` classes.

```html_example
<a href="#" class="primary large button">Large button</a>
<a href="#" class="primary button">Regular button</a>
<a href="#" class="primary small button">Small button</a>
<a href="#" class="primary tiny button">Tiny button</a>
```

---

## Secondary Buttons

These buttons are used for less important, secondary actions on a page.

```html_example
<a href="#" class="secondary large button">Large button</a>
<a href="#" class="secondary button">Regular button</a>
<a href="#" class="secondary small button">Small button</a>
<a href="#" class="secondary tiny button">Tiny button</a>
```



# Forms

<p class="lead">Use forms to allow users to interact with the site and provide information to the company.</p>

---

## Elements of a Form

A form should be marked up using its default HTML properties. The ones we make use of include (in hierarchical order):

- Form
- Label
- Input
- Select
- Text area
- Button

---

## How to Use

Make forms great and easy to use with the following rules:

- Wrap checkboxes and radio buttons within labels for larger hit areas, and be sure to set the for, name, and id attributes for all applicable elements.
- Series of checkboxes and radio buttons below within a `<ul class="inline-list">`.
- Before selecting any set of fields to use for a required input, explore other options (e.g., radio buttons over select lists).

---

## Learn All About Forms

Check out the [Foundation Docs](http://foundation.zurb.com/sites/docs) to learn about how flexible our forms are for creating different layouts. It works perfectly with the grid to meet all your form needs.

---

## Form Layouts

Form elements in Foundation are styled based on their type attribute rather than a class. Inputs in Foundation have another major advantage — they are full width by default. That means that inputs will run as wide as the column that contains them. However, you have two options which make these forms extremely versatile:

- You can size inputs using column sizes, like `.medium-6`, `.small-6`.
- You can create row elements inside your form and use columns for the form, including inputs, labels and more. Rows inside a form inherit some special padding to even up input spacing.

---

## Form Example

```html_example
<form>
  <div class="row">
    <div class="large-12 columns">
      <label>Label</label>
      <input type="text" placeholder="placeholder">
    </div>
  </div>
  <div class="row">
    <div class="large-6 columns">
      <label>Label</label>
      <input type="text" placeholder="placeholder">
    </div>
    <div class="large-6 columns">
      <div class="row collapse">
        <label>Label</label>
        <div class="input-group">
          <input class="input-group-field" type="text" placeholder="placeholder">
          <span class="input-group-label">.com</span>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="large-12 columns">
      <label>Select Box</label>
      <select>
        <option value="good">Good</option>
        <option value="better">Better</option>
        <option value="best">Best</option>
      </select>
    </div>
  </div>
  <div class="row">
    <div class="large-6 columns">
      <label>Choose Your Favorite</label>
      <input type="radio" name="radio1" value="radio1" id="radio1"><label for="radio1">Red</label>
      <input type="radio" name="radio2" value="radio2" id="radio2"><label for="radio2">Blue</label>
    </div>
    <div class="large-6 columns">
      <label>Check these out</label>
      <input id="checkbox1" type="checkbox"><label for="checkbox1">Checkbox 1</label>
      <input id="checkbox2" type="checkbox"><label for="checkbox2">Checkbox 2</label>
    </div>
  </div>
  <div class="row">
    <div class="large-12 columns">
      <label>Textarea Label</label>
      <textarea placeholder="placeholder"></textarea>
    </div>
  </div>
</form>
```



# New Section

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora omnis suscipit id ut laborum recusandae molestias hic aliquid **expedita!** [Non dicta](zurb.com), autem obcaecati error, id ab voluptate unde culpa nulla.

```html_example
<a href="#" class="button">Button</a>
<a href="#" class="button">Button</a>
<a href="#" class="button">Button</a>
```
