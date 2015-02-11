#Installation
Racks can be installed via [Bower](https://bower.io/)! If you don't have bower installed
or if you want to share it to someone / something else, you can also install it by
downloading a [ZIP File](https://github.com/janbiasi/racks/archive/master.zip) if
you'd like to use the latest (**unstable!**) release from the Master Branch or grab
the latest [Release](https://github.com/janbiasi/racks/releases) from Racks.

```sh
$ bower install --save racks
```

*That's it!*

#Building custom Components
###Templates and Bootstrap
You can use the templates for custom components (HTML and JavaScript), located in
the public [GitHub Repository](https://github.com/janbiasi/racks/tree/master/templates).

###Structured Content
Create a folder e.G. in the root of your folder, called <code>racks-custom</code>,
where you create a folder for every single component, with a revision or dist
folder below it. So, the structure would look like this;

```
racks-custom/
   |
   + my-element/
   |   |
   |   + v1.0.0/
   |   |   |
   |   |   + my-element.html
   |   |   + my-element.js
   + my-other-element
   ....
```

###Register the Component
To add the component to racks, you have to edit the <code>racks.html</code> in
the dist root of the bower installation. Add the path of each custom component
into the import file to grant 100% support in the latest major browsers. You can
also create a custom importer **at your own risk**.

#Racks Components
###General Information
#####Attributes
Racks attributes are placed on top of the rack elements, such as the <code>href</code> attribute on the [link](#this-was-an-attr) element. For example take a look at the following code snippet;
```html
<racks-component my-attr="my-value"></racks-component>
```
#####Required
Some attribtues can be required for working with it in the ShadowDOM factory or
something like this. Please provide all required attributes while creating a
racks (UI) element.

#####Types
There are different types of settings or parameters which can be passed to racks elements, here are most of them explained what they are and how you can use them in your code.

| Type    | Explenation                                  |
|---------|----------------------------------------------|
| attr    | Attribute type, take a look at (Attributes)(#attributes) |
| class   | Specific classes to use on the element with <code>class=""</code>|
| data    | Custom data attributed, starting with <code>data-</code> |
| method  | A function which can be called on an instanciated object |



###Racks Button
| Definition | Required | Type  | Description         |
|------------|----------|-------|---------------------|
| no-shadow  | no       | attr  | Add to prevent box-shadow |
| no-effect  | no       | class | Disables the riffle/wave animation on tap |
| large      | no       | class | Makes the button large |
| primary    | no       | class | Creates a primary button |
| default    | no       | class | Creates a default gray button |
| pink       | no       | class | The awesome pink button |
| yellow     | no       | class | The awesome yellow button |
| orange     | no       | class | The awesome orange button |
| dark       | no       | class | The awesome dark-blue button |

###Racks Layout
*No additional information found*

###Racks Dialog
*No additional information found*

###Racks Appbar
*No additional information found*

###Racks Menu
| Definition | Required | Type  | Description         |
|------------|----------|-------|---------------------|
| horizontal | no       | attr  | Used for creating traditional menus |
