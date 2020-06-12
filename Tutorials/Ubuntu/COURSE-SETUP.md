# Course Environment Setup Instructions

## Setting up your dev environment for mac
1. Read the [vagrant documentation for installing on your machine](https://www.vagrantup.com/docs/installation/)
2. Read the [virtual box documentation for installing on your machine](https://www.virtualbox.org/wiki/Downloads)
   1. If when installing virtualbox you did not see a green check mark, it was most likely because you have to allow it by going to security and privacy settings and allowing the program to run. 
3. Open a terminal and do the following
   1. Run `mkdir ~/196-vagrant` in your terminal- this command makes a new folder
   2. Run `cd ~/196-vagrant`
   3. Run `curl -O https://raw.githubusercontent.com/Joshuad2uiuc/196-vagrant/master/Vagrantfile` to download the Vagrantfile.
   4. Run `curl -O https://raw.githubusercontent.com/Joshuad2uiuc/196-vagrant/master/install.sh` to download the install script.
   5. Run `vagrant up` - tells Vagrant to make a new Vagrant box using the information specified in the `Vagrantfile`
## Setting up your dev environment for windows
If you are on windows, this process is going to be a lot larger of a pain. So instead you have 3 alternatives.
   1. (Easiest option) You can follow [this tutorial](https://itsfoss.com/install-bash-on-windows/) to install a bash shell on your windows 10 
   	  machine (if you are using anything older than windows 10, please contact us and we will find a work around)
        - Note, this option may become annoying in the future since you will be missing a lot of packages (you'll be able to install these, but it will just be more work)
   2. (Best option) You can duel boot linux onto your PC (probably worth it as linux is the best option for all your future classes). You can find instructions [here](https://linoxide.com/distros/install-ubuntu-18-04-dual-boot-windows-10/)
   3. Download/Use another virtual machine of your choice. But recommend options 1 or 2.
  
While I recommend one of the first two options since they will be more useful for future courses, you can set up vagrant with the instructiosn below.
Here is how you can go about doing this:
1. Download virtualbox and vagrant for windows from the same links above
2. Download the Vagrantfile [here](https://raw.githubusercontent.com/Joshuad2uiuc/196-vagrant/master/Vagrantfile) and install.sh file [here](https://raw.githubusercontent.com/Joshuad2uiuc/196-vagrant/master/install.sh)
   - Make sure to save the Vagrantfile as type "." NOT a textfile
3. Create a new folder called `196-vagrant` and move these two files into that folder
4. Now, you have to navigate to the directory using the windows powershell (you can open this by just searching for it in your windows searchbar)
   - You can either `cd` into the directory
   - Or, you can open up your file explorer to the correct directory. Double click on the directory path (the highlighted area in the image below) and type `powershell`
    
![open shell](https://gitlab.engr.illinois.edu/cs196/course-resources/raw/master/assets/openshell.PNG).

5. Now, run `vagrant up` and `vagrant ssh` and you should be good to go!

You can learn more about the different Vagrant commands by entering `vagrant --help` in your terminal. 

## Gitlab
We will use Gitlab for all course related infrastructure (homework, group projects, grades). 
1. Hop into your virtual machine or way you are using on windows .
2. Navigate to [our schools wiki guide to setup your account and install git](https://wiki.illinois.edu/wiki/pages/viewpage.action?pageId=586659607)
3. Once done, you should able to navigate to the [course location](https://gitlab.engr.illinois.edu/cs196) and clone a repository.
   1. For example, go to [this repo](https://gitlab.engr.illinois.edu/cs196/course-resources), click on the drop down arrow in clone at the top right, and then copy the clone with https link. 
   2. Hop into your terminal and run `git clone <link that you copied>` to copy the terminal. 
   3. A new directory should be made and you should be able to see what you copied. 


## How to submit and get files 
1. You should find your repo in the student groups section
![](https://gitlab.engr.illinois.edu/cs196/course-resources/raw/master/assets/group)
2. When you click on it you should see your repo
![](https://gitlab.engr.illinois.edu/cs196/course-resources/raw/master/assets/repo)
3. After clicking on the branches in your repo, you should end up here
![](https://gitlab.engr.illinois.edu/cs196/course-resources/raw/master/assets/branches)
4. Click on the merge request button, which will open up this
![](https://gitlab.engr.illinois.edu/cs196/course-resources/raw/master/assets/make-merge-request)
5. Then it will take you to this screen where you can merge the code
![](https://gitlab.engr.illinois.edu/cs196/course-resources/raw/master/assets/merge)
6. Then you can click through and find the files that were merged
![](https://gitlab.engr.illinois.edu/cs196/course-resources/raw/master/assets/files)
7. Go into your repository in your terminal and then run `git pull` to get the changes from the remote into your local.

This will be the general process for merging files. For submitting your code, follow these steps
1. Make your changes
2. `git add <file>`
3. `git commit -m "message"
4. `git push`
It may give an error with a message saying the branch is not being tracked remotely, and you need to push the branch upstream. Copy that command and run it. 


