<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>LESSON 3</title>

	<link rel="stylesheet" type="text/css" href="style.css"></script>
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
	<script type="text/javascript" src="script.js"></script>
	<script src="fancyTable.js"></script>
</head>
<body>
	<table> <tr> <td>
	<div id="modifier" class="block">
		<div class="block-title">
			Управление записной книжкой
		</div>

		<div class="menu-bar">
			<button id="clear-button" class="left-btn b-t-n">Очистить</button>
			<button id="submit-button" class="right-btn b-t-n">Отравить</button>
		</div>

		<div id="submit-content">
			<table>
				<tr>
					<td class='fstcol'><label>Имя</label></td>
					<td class='seccol'><input type="text" id="name-input"></td>
				</tr>
				<tr>
					<td class='fstcol'><label>Фамилия</label></td>
					<td class='seccol'><input type="text" id="surname-input"></td>
				</tr>
				<tr>
					<td class='fstcol'><label>Телефон</label></td>
					<td class='seccol'><input type="text" id="phone-input"></td>
				</tr>
				<tr>
					<td class='fstcol'><label>Категория</label></td>
					<td class='seccol'><input type="text" id="group-input"></td>
				</tr>
			</table>
		</div>
	</div>

	</td> <td>

	<div id="explorer" class="block">
		<div class="block-title">
			Записная книжка
		</div>
		<div class="menu-bar">
			<button id="delete-button" class="left-btn b-t-n" disabled>Удалить</button>
			<button id="modify-button" class="left-btn b-t-n" disabled>Изменить</button>
			<button id="update-button" class="right-btn b-t-n">Обновить</button>
		</div>

		<div class="content">
			<table id='phone-book-table'>
		
			</table>
		</div>
	</div>

	</td> </tr> </table>
</body>
</html>
