Order of build targets.
--------------------------
SoyCompiler

Run when new namespaces have been 'required' or 'provided'
-DepsWriter (For DEV)
-ClosureBuilder.{ getDependencies | getExportDependencies }  (For Compiling JS in the next step)

ClosureCompiler.{ dev|exportDev|prod }

CopyForBuild (Copies resources from the 'src' dir to the 'bin' dir)

------ Webstorm command tool setup -----------
- In Webstorm, setup a command line tool for Windows cmd.exe
- Then in the command tools console, you can run:
    cmd /c ant -file build/build.xml

-------------------------------------
Available cmd line properties
-Dversion   (eg. ant -Dversion=1)

-------------------------------------
Pre-requisites
Ant - http://ant.apache.org/bindownload.cgi
Ant-Contrib - http://sourceforge.net/projects/ant-contrib/files/ant-contrib/1.0b3/ant-contrib-1.0b3-bin.tar.gz/download ( place in {ANT_install_dir}/lib )

Closure compiler - http://code.google.com/p/closure-compiler/downloads/list
Soy compiler for JS - http://code.google.com/p/closure-templates/downloads/list