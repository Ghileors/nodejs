# nodejs-homework
goit nodejs homework-01

[Link to the task](https://github.com/goitacademy/nodejs-homework/blob/master/homework-01/README.md)

```
# Получаем и выводим весь список контактов в виде таблицы (console.table)
node index.js --action="list"
```
![print scrin](./assets/action-list.png)


```
# Получаем контакт по id
node index.js --action="get" --id=5
```
![print scrin](./assets/action-get.png)


```
# Добавялем контакт
node index.js --action="add" --name="Mango" --email="mango@gmail.com" --phone="322-22-22"
```
![print scrin](./assets/action-add.png)


```
# Удаляем контакт
node index.js --action="remove" --id=3
```
![print scrin](./assets/action-remove.png)