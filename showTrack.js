document.getElementById('showTrackText').addEventListener('click', function(){
    var showWindow = document.getElementById('completedShowWindow');
    $(showWindow).slideDown();
    
});

document.getElementById('downloadButton').addEventListener('click', function(){

    /*/
    window.localStorage.list = new Array(); 
    window.localStorage.currentShow = 'None';
    window.localStorage.episodeNumber = 0;
    window.localStorage.showsCompleted = 0;
    window.localStorage.soundOption = true;
    window.localStorage.totalShows = 0;
    window.localStorage.completedShows = new Array();
    //*/
    var currentList = window.localStorage.getItem("list");
    var correctList = formatString(currentList);

    var currentShow = window.localStorage.getItem("currentShow");

    var episodeNumber = window.localStorage.getItem("episodeNumber");

    var showsCompleted = window.localStorage.getItem("showsCompleted");


    var totalShows = window.localStorage.getItem("totalShows");

    var completedShows = window.localStorage.getItem("completedShows");
    var correctCompletedShows = formatString(completedShows);

    var currentDate = new Date();
    var newWindow = window.open("", "MsgWindow", "width=750,height=500");
    newWindow.document.write(
        "<p>" + currentDate.toDateString() + "<br>"+ currentDate.getHours() + ": "+ currentDate.getMinutes() + "</p>"+ "<br>"+"<div>"+ "Current show -> "+ currentShow + "<br>"+ "Episode-> " + episodeNumber + "<br>"+  "Total Shows-> " + totalShows + "<br>" + "Total Completed-> "+ showsCompleted + "<br><br>"+"~Current List"+ "<br>"+ correctList + "<br>" + "~Completed Shows"+"<br>"+correctCompletedShows+"</div>" 
        );
});


function formatString(decode)
{
    var correctString = "";
    var arrayVals = decode.split(",");
    for (i=0; i< arrayVals.length; i++)
    {
        correctString+= arrayVals[i] + "<br>";
    }
    return correctString;
}

document.getElementById('upArrowBack').addEventListener('click', function(){
    var showWindow = document.getElementById('completedShowWindow');
    $(showWindow).slideUp();
});
    
document.getElementById('userCommand').addEventListener("focus", function()
{
    document.getElementById('userCommand').style.animationDuration = "0s";
    document.getElementById('userCommand').style.opacity = '100%';
    document.getElementById('userCommand').style.outline ="none";
});

document.getElementById('userCommand').addEventListener("focusout", function()
{
    document.getElementById('userCommand').style.animationDuration = "3s";
});


document.getElementById("addEpisode").addEventListener("click",function()
{
    episodeCount = localStorage.getItem("episodeNumber");
    episodeCount++;
    localStorage.episodeNumber = episodeCount;
    updateVals();
});

document.getElementById('subtractEpisode').addEventListener('click',function()
{
    episodeCount = localStorage.getItem("episodeNumber");
    if(episodeCount!=0)
    {
        episodeCount--;
    }
    localStorage.episodeNumber = episodeCount;
    updateVals();
});

document.getElementById('restartCountEpisode').addEventListener('click', function()
{
    episodeCount = localStorage.getItem("episodeNumber");
    episodeCount = 0;
    localStorage.episodeNumber = episodeCount;
    updateVals();
});

document.getElementById("addCompleteShow").addEventListener("click", function()
{
    totalShow = localStorage.getItem("showsCompleted");
    totalShow++;
    localStorage.showsCompleted = totalShow;
    updateVals();
});

document.getElementById("subtractCompleteShow").addEventListener("click", function()
{
    totalShow = localStorage.getItem("showsCompleted");
    if(totalShow!=0)
    {
        totalShow--;
    }
    localStorage.showsCompleted = totalShow;
    updateVals();
});

document.getElementById("resetCompleteShow").addEventListener("click", function()
{
    totalShow = localStorage.getItem("showsCompleted");
    totalShow = 0;
    localStorage.showsCompleted = totalShow;
    updateVals();
});

document.getElementById("randomShowGenerate").addEventListener('click',function()
{
    allShows = localStorage.list.split(",");
    randomSelectShow = randomOneOf(allShows);
    $("#randomshow").html(randomSelectShow);
    document.getElementById("commandTrack").value +="\n\n"+ "Random show -> "+randomSelectShow;
});

window.addEventListener("keydown",function(keyPressed)
{
    removeEffectSound = document.getElementById('removeSound');

    possibleCommands=["start", "login", "help", "upload", "add","remove","sound","clear","currentshow", "search", "complete"];

    if(keyPressed.key =="Enter")
    {
        userCommand = String(document.getElementById('userCommand').value);
        userCommandLowerCase = userCommand.toLowerCase();
        userCommandSplit = userCommandLowerCase.split("_");

        if (userCommandSplit[0] == "start")
        {
            window.localStorage.list = new Array(); 
            window.localStorage.currentShow = 'None';
            window.localStorage.episodeNumber = 0;
            window.localStorage.showsCompleted = 0;
            window.localStorage.soundOption = true;
            window.localStorage.totalShows = 0;
            window.localStorage.completedShows = new Array();
            $("#currentList").fadeIn("4");
            $("#currentShow").html(localStorage.currentShow);
            $("#episodeCount").html(localStorage.episodeNumber);
            $("#totalShowsPlanned").html(localStorage.totalShows);
            $("#showsCompletedCount").html(localStorage.showsCompleted);
            document.getElementById("commandTrack").value +="\n"+ "|"+userCommand+ "\n\n"+ "~User account created";
            document.getElementById("userCommand").value = "";
            updateVals();
        }
        else if (userCommandSplit[0] == "clear")
        {
            document.getElementById("commandTrack").value = "";
            document.getElementById("userCommand").value = "";

        }
        else if (userCommandSplit[0] == "login")
        {
            if(localStorage.list == null)
            {
                window.localStorage.list = new Array(); 
                window.localStorage.currentShow = 'None';
                window.localStorage.episodeNumber = 0;
                window.localStorage.showsCompleted = 0;
                window.localStorage.soundOption = true;
                window.localStorage.totalShows = 0;
                window.localStorage.completedShows = new Array();
                document.getElementById("commandTrack").value += "\n\n"+ "~No previous account was found, but a new one was created";
            }
            $("#currentList").fadeIn("4");
            $("#currentShow").html(localStorage.currentShow);
            $("#episodeCount").html(localStorage.episodeNumber);
            $("#totalShowsPlanned").html(localStorage.totalShows);
            $("#showsCompletedCount").html(localStorage.showsCompleted);
            document.getElementById("commandTrack").value +="\n\n"+ "|"+userCommand+ "\n\n"+ "~User login";
            document.getElementById("userCommand").value = "";
            updateVals();
        }
        else if (userCommandSplit[0] == "help")
        {
            document.getElementById("commandTrack").value +="\n"+ "|"+userCommand+ "\n\n"+ "~List of commands" +"\n"+"{upload -> prompt to upload a txt document with a list of shows. Adds all values in the txt file to list if each show is on a new line in the txt file}"+"\n\n"+"{add_'walking dead' -> add a show to the list}"+"\n\n"+"{remove_'walking dead' -> remove a show from the list}"+"\n\n"+"{sound_'true' -> turn the sound on or off. true = on, false = off}"+"\n\n"+"{clear -> clears the console and command history}"+"\n\n"+"{currentshow_'walking dead' -> sets the current show. If the current show is not on the list, it will be added to the list}"+"\n\n"+"{complete_'walking dead' -> adds the show to the completed show list and removes the show from the current list}";
            document.getElementById("userCommand").value = "";
        }
        else if(userCommandSplit[0] == "upload")
        {
            document.getElementById("inputFile").click();
            document.getElementById("userCommand").value = "";

            document.getElementById("inputFile").addEventListener("change", function()
            {
                var allFiles = document.querySelector('input[type="file"]');
                if (allFiles.length == 0)
                {
                    document.getElementById("commandTrack").value +="\n\n"+ "|"+userCommand+ "\n\n"+ "~No files were selected";
                    return;
                       
                }
                else if(allFiles.files[0].type != "text/plain")
                {
                    document.getElementById("commandTrack").value +="\n\n"+ "|"+userCommand+ "\n\n"+ "~The file you selected was not a txt file, please try again";   
                }
                else if(allFiles.length > 1)
                {
                    document.getElementById("commandTrack").value +="\n\n"+ "|"+userCommand+ "\n\n"+ "~Sorry, you can only upload one file at a time";   
                }
                else
                {
                    var fileReader = new FileReader();
                    fileReader.onload = function()
                    {
                        txtFile = String(fileReader.result).trim().split("\n");
                        tempArray = [];
                        for(i = 0; i<txtFile.length; i++)
                        {
                            currentShow = txtFile[i];
                            currentShowLower = currentShow.toLowerCase().trim();
                            tempArray.push(currentShowLower); 
                                                   
                        }
                        duplicateRemove = removeDuplicates(tempArray);
                        duplicateRemove.sort();
                        localStorage.setItem("list", duplicateRemove);
                        finalString = "";
                        for(j = 0; j < duplicateRemove.length; j++)
                        {
                            if(j == 0)
                            {
                                finalString += "\n\n" +duplicateRemove[j]+"\n";
                            }
                            else
                            {
                                finalString += duplicateRemove[j]+"\n";
                            }
                        }
                        document.getElementById('currentList').value += finalString;
                        document.getElementById("commandTrack").value +="\n\n"+ "|"+userCommand+ "\n\n"+ "~added all shows from " + String(allFiles.files[0].name);  
                        updateVals();
                    };
                    fileReader.readAsText(allFiles.files[0]);
                }
            })
        }
        else if(userCommandSplit[0] == "add")
        {
            currentList = localStorage.list.split(',');
            currentList.push(userCommandSplit[1].trim());
            finalAddReturn = removeDuplicates(currentList);
            localStorage.list = finalAddReturn;
            document.getElementById("commandTrack").value +="\n\n"+ "|"+userCommand+ "\n\n"+ "~added "+ userCommandSplit[1] + " to your list";  
            document.getElementById("userCommand").value = "";
            if(localStorage.soundOption == "true")
            {
                addEffectSound = document.getElementById("addSound");
                addEffectSound.play();
            }
            updateVals();
        }
        else if(userCommandSplit[0] == "remove")
        {
            currentList = localStorage.getItem("list").split(',');
            copyList = [...currentList];
            indexToRemove = copyList.indexOf(userCommandSplit[1]);
            if (indexToRemove != -1)
            {
                copyList.splice(indexToRemove, 1);
            }
            localStorage.list = copyList;
            document.getElementById("commandTrack").value +="\n\n"+ "|"+userCommand+ "\n\n"+ "~removed "+ userCommandSplit[1] + " from your list";  
            document.getElementById("userCommand").value = "";
            if(localStorage.soundOption == "true")
            {
                removeEffectSound.play();
            }
            updateVals();
        }
        else if(userCommandSplit[0] == "sound")
        {
            if(userCommandSplit[1] == "true")
            {
                localStorage.soundOption = "true";
                document.getElementById("commandTrack").value +="\n\n"+ "|"+userCommand+ "\n\n"+ "~Sound effects have been turned on";
                document.getElementById("userCommand").value = "";
            }
            else if(userCommandSplit[1] == "false")
            {
                localStorage.soundOption = "false";
                document.getElementById("commandTrack").value +="\n\n"+ "|"+userCommand+ "\n\n"+ "~Sound effects have been turned off";
                document.getElementById("userCommand").value = "";
            }
            else
            {
                document.getElementById("commandTrack").value +="\n\n"+ "|"+userCommand+ "\n\n"+ "~I am sorry this is not a valid sound setting. true = sound on, false = sound off";
                document.getElementById("userCommand").value = ""; 
            }
        }
        else if(userCommandSplit[0] == "currentshow")
        {
            localStorage.currentShow = userCommandSplit[1];
            currentList = localStorage.list.split(',');
            currentList.push(userCommandSplit[1].trim());
            finalList = removeDuplicates(currentList);
            localStorage.list = finalList;
            document.getElementById("commandTrack").value +="\n\n"+ "|"+userCommand+ "\n\n"+ "~set "+ userCommandSplit[1] + " to your current show";  
            document.getElementById("userCommand").value = "";
            updateVals();
        }
        
        else if(userCommandSplit[0] == "complete")
        {
            var completedShowList = localStorage.completedShows.split(",");
            var showList = localStorage.list.split(",");
            completedShowList.push(userCommandSplit[1]);
            
            console.log(showList.indexOf(userCommandSplit[1]));
            console.log(showList.includes(userCommandSplit[1]));
            
            if (showList.includes(userCommandSplit[1]))
            {
              localStorage.list = removeElement(showList, showList.indexOf(userCommandSplit[1]));
            };
            localStorage.completedShows = completedShowList;
            localStorage.showsCompleted = Number(completedShowList.length - 1);
            document.getElementById("commandTrack").value +="\n\n"+ "|"+userCommand+ "\n\n"+ "~added "+ userCommandSplit[1] + " to your completed shows";  
            document.getElementById("userCommand").value = "";
            completeListUpdate();
        }
        
        else
        {
            document.getElementById("commandTrack").value +="\n\n"+ "|"+userCommand+ "\n\n"+ "~I am sorry " + userCommand + " is not a valid command";
            document.getElementById("userCommand").value = "";
        }
        updateVals();
    }
});





function updateVals()
{
    $(getList()).slideUp(4);
    completeListUpdate();
    $("#currentShow").html(localStorage.currentShow);
    $("#episodeCount").html(localStorage.episodeNumber);
    $("#totalShowsPlanned").html(localStorage.totalShows);
    $("#showsCompletedCount").html(localStorage.showsCompleted);
    
}


function getList()
{
    var stringReturn, currentList;
    stringReturn ="";
    currentList = localStorage.getItem("list");
    correctList = currentList.split(",");
    correctList.sort();
    if(correctList[0] == "")
    {
        correctList.splice(0,1);
    }
    localStorage.totalShows = Number(correctList.length);

    for(i = 0; i<correctList.length; i++)
    {
        if(i == 0)
        {
            stringReturn += "\n\n" +correctList[i]+"\n";
        }
        else
        {
            stringReturn += correctList[i]+"\n";
        }
    
    }
    document.getElementById('currentList').value = "";
    document.getElementById('currentList').value += "~Current List";
    document.getElementById('currentList').value += stringReturn;
}

function completeListUpdate()
{
    stringCompleteReturn = "";
    currentCompleteList = localStorage.getItem("completedShows");
    correctCompleteList = currentCompleteList.split(",");
    correctCompleteList.sort();
    document.getElementById("showsCompletedCount").innerHTML = Number(correctCompleteList.length); 
    
    if(correctCompleteList[0] == "")
    {
        correctCompleteList.splice(0,1);
    }
    
    for(i = 0; i<correctCompleteList.length; i++)
    {
        if(i == 0)
        {
            stringCompleteReturn += "\n\n" +correctCompleteList[i]+"\n";
        }
        else
        {
            stringCompleteReturn += correctCompleteList[i]+"\n";
        }
    
    }
    
    document.getElementById('completedList').value = "";
    document.getElementById('completedList').value += "~Completed shows";
    document.getElementById('completedList').value += stringCompleteReturn;


    
}


function removeDuplicates (list)
{
    let uniqueArray = new Set();

    for(u=0; u<list.length; u++)
    {
        uniqueArray.add(list[u]);
    }
    return Array.from(uniqueArray);
}

function removeElement(a,index)
{
    let newArray = [...a];
    newArray.splice(index,1);
    return newArray;
}