#Racks Components
###Notes
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



###Racks Button
| Attribute | Required | Type  | Description         |
|-----------|----------|-------|---------------------|
| no-shadow | no       | attr  | Add to prevent box-shadow |
| no-effect | no       | class | Disables the riffle/wave animation on tap |
| large     | no       | class | Makes the button large |
| primary   | no       | class | Creates a primary button |
| default   | no       | class | Creates a default gray button |
| pink      | no       | class | The awesome pink button |
| yellow    | no       | class | The awesome yellow button |
| orange    | no       | class | The awesome orange button |
| dark      | no       | class | The awesome dark-blue button |
