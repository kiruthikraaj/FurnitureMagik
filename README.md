<br/>
<br/>
<br/>

<p align="center">
    <img alt="awesome" src="./assets/logo.png" width="480" />
</p><br/>
<br/>
<br/>
A Native Android Application buid with React Native and Authentication (Phone) using Firebase Authentication.
<br/>
<br/>

<p align="center">
    <a href="https://drive.google.com/file/d/1PQSH-7WL3xL-F83U5lcwgrNt44Q89gGT/view?usp=sharing" target="_blank">
        <img alt="android" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Android_Studio_icon.svg/1200px-Android_Studio_icon.svg.png" width="50"/> <br/>Click to Download APK
    </a>
</p>
<br/>
<br/>


# Features

Login with Phone using Firebase Auth<br/>
<ul>
    <li>Login: user credentials is stored so that the next time user no need to login again</li>
    <li>Logout</li>
</ul>



<h2>Storage</h2>
Storage using AsyncStorage<br/>
<ul>
    <li>SQLITE</li>
    <li>ROCKSDB</li>
</ul>
<br/>
<h2>Adding Offer:</h2>
<h3>Image</h3>
<ul>
    <li>Gallery</li>
    <li>Camera</li>
</ul>
<br/>



# Screens

<div style="text-align: center"><table><tr>
    <td style="text-align: center">
        <img src="./screenshots/1.jpg" width="300" height="550"/>
    </td>
    <td style="">
       <h1>Login Screen :</h1>
       <p>The designed app for the given requirement consist of login page as its first page.<br>
       The input is only mobile number and we can proceed only when the number is valid.<br>
       </p>
    </td>
</tr>
<tr>
    <td style="text-align: center">
        <img src="./screenshots/2.jpg" width="300" height="550"/>
    </td>
    <td style="">
       <h1>OTP Validation :</h1>
       <p>
       After the validation of the mobile number, it is verified with a help of firebase authentication (Phone Auth).<br>
       6 digit OTP is received to the corresponding mobile number. Once the entered OTP matches with the generated,<br>
       we can proceed to the next page.<br></p>
    </td>
</tr>

<tr>
    <td style="text-align: center">
        <img src="./screenshots/3.jpg" width="300" height="550"/>
    </td>
    <td style="">
       <h1>Home Screen :</h1>
       <p>
       Login page leads us right here to the home page.<br>
       The UID generated for every mobile number during the time<br> 
       of login is the storeKey where all the offers (data) get stored.
      </p><br>
      <h3>Database: (AsyncStorage)</h3><br>
The database (Storage unit) used here is AsyncStorage. <br>
Depending on what the android device has in it, the AsyncStorage uses either <b>SQLITE or ROCKSDB</b>.<br>
Now with the <b>storeKey</b>, if there is no data stored then the page says no offers (data) to displays.<br>
 If the storeKey has offers (data) in it then all the offers are displayed in the Flatlist.<br>

 This page also contains a <b>floating action bar (FAB)</b> denoting 'plus', <br>
 further navigating to a page where you add data on clicking it.<br>
    </td>
</tr>

<tr>
    <td style="text-align: center">
        <img src="./screenshots/4.jpg" width="300" height="550"/>
    </td>
    <td style="">
       <h1>Add Offers (Data Entry) :</h1>
       <p>
       Being navigated to this page we can add new offer (data) with several attributes.<br>
      This page has several fields describing the product having <br>
       <b>Product Image<br> Product Name<br> Type<br> Original Price<br> Discount Price</b><br>
       </p>
    </td>
</tr>

<tr>
    <td style="text-align: center">
        <img src="./screenshots/5.jpg" width="300" height="550"/>
    </td>
    <td style="">
       <h1>Data Validation :</h1>
       <p>
       The  image can be chosen from the gallery or captured instantly to upload.<br>
 A proper name for the product is given in the product name field.<br>
<br>
</br>
 The next field is the dropdown / dialog where it lets you to choose the type,the product falls in.<br>
 The next two are numerical input field where original and discount price is fed respectively.<br>
 <br></br>
 If we are done with the details of the product, save button is clicked. <br></br>
 On clicking empty fields are checked. If any found, it adds a required flag to the particular field.<br></br>
       </p>
    </td>
</tr>

<tr>
    <td style="text-align: center">
        <img src="./screenshots/6.jpg" width="300" height="550"/>
    </td>
    <td style="">
       <h1>Updated List of Added Offers</h1>
       <p>
       Once all the fields are filled, leaving none empty the data is stored using storeKey.<br></br>
       After the data is successfully stored, it automatically navigates to the homepage. <br></br>
       </p>
    </td>
</tr>

</table></div>
