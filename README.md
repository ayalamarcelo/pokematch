<h1 align="center">Pokematch</h1>
<p>This project allows you to experience the fun of memory games while diving into the exciting world of Pokémon. Test your matching skills as you try to find pairs of your favorite Pokémon.</p>

<p>Here is a demo of the game: <a href="https://ayalamarcelo.github.io/pokematch/">Pokematch</a></p>

<p>For the full version, follow these next steps:</p>

### Usage

1. Open a new terminal.

```bash
$ git clone https://github.com/ayalamarcelo/pokematch.git or Fork
```

2. Use the package manager.

```bash
$ npm install
```
3. Connect to MySQL using the credentials in your `database/connection.js` file.

```bash
$ mysql -u user -p
```
4. Create the table. Open the `backup.sql` file and copy & paste its content into your MySQL.

Make sure to replace user with your MySQL username and enter your password when prompted.
Here’s a link for MySQL usage: [How to get started with MySQL](https://dev.mysql.com/doc/mysql-getting-started/en/)

5. Run
 
```bash
$ npm run dev
```

6. Follow the localhost URL: 

```bash
$ Server listening on http://localhost:4040
```

### Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

> [!important]
> Please make sure to update tests as appropriate.
