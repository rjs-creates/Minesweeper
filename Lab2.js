// Creater - Rajeshwar Singh
// Submission Code : 1201_2000_l02

let cells = [];
let row_max ;
let col_max ;
let num_mines ;
let games = [];
let highCounter = 0;
let clicks = 0
let stop = false

function Cell(row,col)
{
    this.row = row;
    this.col = col;
    this.isMine = false;
    this.is_Exposed = false
    this.adjacent_count = 0;
    this.colorIndex = -1;
    this.highlight = false;

}

Cell.prototype.Show = function()
{
    let ourCell = document.querySelector(`#iButton${this.row*(row_max)+this.col}`);
    if(this.is_Exposed)
    {
        if(this.isMine)
        {
            if(this.highlight)
            {
                /*let sizeH = window.getComputedStyle(ourCell,null).getPropertyValue("height");
                let sizeW = window.getComputedStyle(ourCell,null).getPropertyValue("width");*/
                ourCell.innerHTML = '<img src="flag.png" id = "images" alt="mine"/>';
                //document.getElementsByTagName('img').height = `${size}`;
               /* document.getElementById("images").style.height = sizeH;
                document.getElementById("images").style.width = sizeW;
                ourCell.height = sizeH;*/
            }
            else
            {
                /*let sizeH = window.getComputedStyle(ourCell,null).getPropertyValue("height");
                let sizeW = window.getComputedStyle(ourCell,null).getPropertyValue("width");*/
                ourCell.innerHTML = '<img src="mine.png" id = "images" alt="mine"/>';
                /*document.getElementById("images").style.height = sizeH;
                document.getElementById("images").style.width = sizeW;*/
            }
        }
        else
        {
            ourCell.style.backgroundColor="white";
            if(this.adjacent_count == 0)
                ourCell.innerHTML = "";
            else
            ourCell.innerHTML = `${this.adjacent_count}`
        }
        //ourCell.innerHTML = `${this.adjacent_count}`;
    }
    else
    {
        //ourCell.innerHTML = `${this.adjacent_count}`;
    }
}

Cell.prototype.Bind = function()
{
    let ourCell = document.querySelector(`#iButton${this.row*(row_max)+this.col}`);
    ourCell.onclick = (es) =>{
        clicks++;
        if(es.shiftKey)
        {
            if(this.isMine)
            {
                this.highlight = true;
                this.is_Exposed = true;
                this.Show();
                highCounter++;
                if(highCounter == num_mines)
                {
                    let body = document.getElementById("result");
                    body.innerHTML = "Winner";
                    stop = true;
                }
            }
            else
            {
                let body = document.getElementById("result");
                body.innerHTML = "Loser,Wrong Flag";
                stop = true;
            }
        }
        else
        CheckCell(this.row,this.col);
    };
}

function RandomCell()
{
    let randRow = Math.floor(Math.random()*row_max);
    let randCol = Math.floor(Math.random()*col_max);
    return cells[randRow][randCol];
}

function CountAdjacent(row,col)
{
    let adCount = 0;
    let startRow = row-1;
    let startCol = col - 1;
    let endRow = row+1;
    let endCol = col+1
    if(row == 0)
    {
        startRow = 0;
    }
    if(col == 0)
    {
        startCol = 0;
    }
    if(row == (row_max)-1)
    {
        endRow = (row_max)-1;
    }
    if(col == (col_max)-1)
    {
        endCol = (col_max)-1;
    }
    for(let i = startRow;i<= endRow;i++)
    {
        for(let j = startCol; j <= endCol;j++)
        {
            if(cells[i][j].isMine == true)
            {
                adCount++;
            }
        }
    }
    return adCount;
}

function NewGame()
{
    stop = false;
    let body = document.getElementById("result");
    body.innerHTML="";
    makeGrid(row_max,col_max);
    for(let i = 0; i < row_max; i++)
    {
        cells[i] = [];
        for(let j = 0; j < col_max;j++)
        {
            cells[i][j] = new Cell(i,j);     
        }
    }
    
    let counter = 0;
    while(counter < num_mines)
    {     
        let cell = RandomCell();
        if(cell.isMine == false)
        {
            cell.isMine = true;  
            counter++; 
        }
    }
    for(let i = 0; i < row_max; i++)
    {
        for(let j = 0; j < col_max;j++)
        {   
            if(!cells[i][j].isMine)   
                cells[i][j].adjacent_count = CountAdjacent(i,j);
            else
            cells[i][j].adjacent_count = -1;
        }
    }    
}

function makeGrid(rows,cols)
{
    let body = document.getElementById("game");
    body.innerHTML="";
    body.style.textAlign = "center";
    body.style.display = "grid";
    body.style.gridTemplateColumns = `repeat(${row_max},1fr)`;
    body.style.gridTemplateRows = `repeat(${col_max},1fr)`;
    
    for(let i = 0; i < row_max;i++)
    {
        for(let j = 0; j < col_max;j++)
        {            
            let eachCell = document.createElement("button");
            eachCell.style.backgroundColor = "black";
            eachCell.id = `iButton${i*(row_max)+j}`;
            body.appendChild(eachCell);
        }
    }
}

function difficulty()
{
    let diff = document.getElementById("diff").value;
    if(diff == '0')
    {
        row_max = 7;
        col_max = 7;
        num_mines = 7;
    }
    else if(diff == '1')
    {
        row_max = 10;
        col_max = 10;
        num_mines = 13;
    }
    else
    {
        row_max = 15;
        col_max = 15;
        num_mines = 20;
    }
}

function ShowGrid()
{
    for(let i = 0; i < row_max; i++)
    {
        for(let j = 0; j < col_max;j++)
        {
            cells[i][j].Show();
        }
    }
}

function BindGrid()
{
    for(let i = 0; i < row_max; i++)
    {
        for(let j = 0; j < col_max;j++)
        {            
            cells[i][j].Bind();
        }
    }
}

function CheckCell(row,col)
{
    if(!(cells[row][col].is_Exposed) && !stop)
    {
        cells[row][col].is_Exposed = true
        cells[row][col].Show();

        if((cells[row][col].isMine) && !(cells[row][col].highlight))
        {
            let body = document.getElementById("result");
            body.innerHTML = "Loser,Mine";
            stop = true;
        }
        else
        {
        let startRow = row-1;
        let startCol = col - 1;
        let endRow = row+1;
        let endCol = col+1
        if(row == 0)
        {
            startRow = 0;
        }
        if(col == 0)
        {
            startCol = 0;
        }
        if(row == (row_max)-1)
        {
            endRow = (row_max)-1;
        }
        if(col == (col_max)-1)
        {
            endCol = (col_max)-1;
        }
        for(let i = startRow;i<= endRow;i++)
        {
            for(let j = startCol; j <= endCol;j++)
            {
                if(cells[i][j].adjacent_count == 0)
                CheckCell(i,j);
                else if(cells[i][j].adjacent_count > 0)
                {
                    CheckCell(i,j);
                    return;
                }
            }
        }
        }
    }
}

window.onload = () =>
{   

    document.getElementById("Startbutton").onclick = () =>{
        difficulty();
        NewGame();   
        ShowGrid();
        BindGrid();   
    }

}

