Alphabet Scriptor Desktop v1.5.3

Windows build commands: ( Do this on a Git bash setup.)
$ npm install -g electron-packager
$ electron-packager ./ AlphabetScriptor --platform=win32 --arch=x64 --icon=MyIcon.ico

Mac electron build for Mac app command:

$ sudo npm install -g electron-packager
$ electron-packager ./ “Alphabet Scriptor” --icon=./icon.icns


*Take a look within the main.js line 22. It was throwing an error because the (dirname) had to be included for the Macintosh version so that the application would read and write the actual JSON file. Refer to ealier versions to get the exact path of the file change. Do this step first before compiling it out.

Apple Silicon VS Intel Chipsets
*You will have to compile the electron-packager on both Intel and Silicon machines separately using the same technique in order for the node packager manager to compile the correct version of the application to be used for the proper OS configuration. I know it sucks but it must be done.

*Also, remove the unnecessary files like images and directory files and just clean up the resources folders. 

Title to "String"
*Lastly, to add a space, you must turn your title into a string using "quotes". (Dont just copy and paste the code, write it out or else you will get special characters instead)

-Christopher W Carter
11/4/2024
