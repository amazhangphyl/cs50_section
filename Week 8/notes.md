## Introduction

* For a tangible envelope, to send it to another person, we would have to address it, including the recipient's information, our information, and perhaps some little memo on the bottom that specifies what's inside, "fragile," or some other annotation. 

* Our laptops, desktops, and our servers send messages in "virtual envelopes" back and forth across the internet.
  
* These "virtual envelopes" are simply patterns of zeroes and ones that represent our email or a request we've made of the web server.
  
## Addresses

* Let's consider the internet as an inter-networked collection of devices connected via wires or wirelessly.

* All of these devices need unique addresses, just as every building in our world needs a unique address.

### IP  

* **Internet Protocol**, or IP, mandates that every device on the internet has its own IP address, and when we're sending "virtual envelopes," they must include the sender and recipient's addresses.

* IP addresses have format `#.#.#.#`. Each `#` is a placeholder for a value starting at zero and ending at 255. Each placeholder represents 8 bits, so the entire address represents 32 bits.

* Since there are 32 bits in an IP address, there are 2<sup>32</sup> possible permutations of zeroes and ones, so there are approximately 4 billion devices that can have unique addresses on the Internet.

* These 32 bit IP addresses are of version 4 of IP. **IPv6**, version 6, uses 128 bits instead.

* Public IP addresses actually go out onto the internet, while private IP addresses do not. 
  
  * Private IP addresses have these formats: `10.#.#.#`, `172.16.#.#` - `172.31.#.#`, and `192.168.#.#`.
  
  * We can find our own IP addresses in our System Preferences or Settings. Below is a screenshot from a Windows 10 PC.

    ![ip](ipdns.png)

    * Note that the IP address begins with `192.168`, meaning it is a private IP address.
  
  * The router in our home or in the company stops private IP addresses from being routed publicly, a *firewalling mechanism*. 
  
    * Virtually, a firewall is a piece of software that prevents zeroes and ones from going from one place to another. 
  
    * In this case, the firewalling mechanism allows data to be kept securely within our home or within our company rather than allowing it to go out onto the internet. 
  
  * If we wish to send data from our private IP address to an address outside of our home or company, a *border gateway* or *border router* will receive our virtual envelope.
  
  * These border routers are routers that are at the edge of a home or company. These routers will change the private IP address on our "virtual envelope" to a public IP address.

  * These routers use *network address translation** or NAT to convert our private IP address to a public IP address and back. 

  * With private IP addresses, while it seems like the data being sent out from various devices is from the same device, or IP address, it is possible for the home or company to determine which device was accessing the service at a particular time.
  
* IP additionally gives us the feature of *fragmentation*, where if the file is very large, IP will fragment this file into smaller pieces and send multiple envelopes instead. Then, at the other end, this file will be reassembled.

  * This leads to issues such as *net neutrality*, where the government and ISPs can treat different types of files (such as videos, competitor services, etc) differently. 


### TCP

* **Transmission Control Protocol**, or TCP, guarantees the delivery of our virtual envelope. 

*  Routers might receive a "virtual envelope" and drop it (ignore it) because they're too busy, which can occur when everyone's streaming a news broadcast or playing the latest game online. The router just doesn't have enough memory, or RAM, inside of its system to handle it, so the "virtual envelope" is ignored. 

* TCP helps us get the email or webpage to its destination with much higher probability by adding little notes that this packet is number 1 of 2, or 1 of 3, etc. 

* When the recipient receives packets two, three, and four but not one, TCP will tell that device to send a message back to the sender asking to resend packet one. Then, the packet will be resent and the human will ultimately obtain the entire email or webpage. 

* At a low level, TCPs...

    * Note that there are no addresses—those are handled by IP. 
  
    * Source ports and destination ports allow servers to distinguish one type of data from another.

    * These ports specify what protocol is being used to convey information from one computer to another.
  
      * HTTP (Hypertext Transfer Protocol): Convention via which browsers send servers send webpages back and forth; HTTP is given TCP port 80.
  
      * HTTPS: Secure version of HTTP; HTTPS is given TCP port 443.
  
      * INAP: Protocol via which one can receive or check emails; INAP is given TCP ports 143 or 993 depending on the level of security.
  
      * SMTP: Protocol for outbound email; SMTP is given TCP ports 25, 465, or 587.
  
      * SSH (Secure Shell): Connects from one computer to a remote server; SSH is given TCP port 22.
  
    * These ports are also written on our virtual envelope. 

* Thus, on our virtual envelope, we should include our address, the recipient address, the TCP port, and if the file is large, which number packet this packet is.

### DNS

* **Domain Name Service** or DNS, is a server that translates domain names into their corresponding IP addresses.

* Using DNS, we no longer need to know the IP address of Google, Facebook, among other websites. DNS will be able to convert that name into an address for us.
  
* Thus, after we type in something like gmail.com, we need our DNS server to know which IP address gmail.com maps to. However, our DNS server might not know the IP address. In that case, there are larger DNS servers to which we can ask these questions.

* DNS is a hierarchical system where we might have a small DNS server, our ISP has a bigger DNS server, and if our ISP doesn't know the IP address, then there are also root servers around the world, which have mappings for all of the dot coms and their IP addresses.  

* After asking the DNS server once, we can cache the results locally in our browser.
  
  * This is more efficient than asking the DNS server the same question multiple times a day, but if the website reconfigures something and the IP changes, then the address becomes outdated.


## Requesting Webpages

* Now that we know how to address our virtual envelope, we might want to know what goes on the inside as well. When we request a webpage, what is on the inside of that envelope?

* Let's break down `https://www.example.com/`.
  
  * This is a *Uniform Resource Locator*, or URL.

  * `http` is a protocol, a set of conventions that web browsers and web servers have agreed upon to use when intercommunicating.
  
  * `www` is the hostname or the name of the specific server that we're trying to visit. In other contexts, we might call this a subdomain.

  * `example.com` is a domain name that can be bought or rented on an annual basis. 
  
    *  Historically, `.com` stood for commercial, `.net` for network, `.edu` for education, or `.gov` for government. 
  
    *  These `.com`, `.net`, among others, are called *Top Level Domains*, or TLDs.

  * `/` implies `/index.html`. By convention, the name of the file that contains the default web page is `index.html`, `index.htm`, or any extension after `index`.

  * This file is the file that is specified inside the envelope.

* This is what is written inside our envelope:

    ```
    GET/HTTP/1.1
    Host: www.example.com
    ```

    * The first `/` means the default page of the website.
    * The host is specified since one web server can serve up multiple websites. 

* If no errors occurred, we expect to get a response back with this written: 

    ```
    HTTP/1.1 200 OK
    Content-Type: text/html
    ```

    * 200 means OK, meaning the webpage we were looking for has been delivered successfully.

    * The content type is text/html, which lets our browser know what type of file we've received, so our browser will know how to display the file on the screen.
  
    * When transmitting information, `http` keeps the content in English text, but `https` encrypts the content. Thus, `https` is secured while `http` is not, and Harvard moved their site permanently, as they would like us to visit their site securely.
  
    * Browsers have become more user friendly, so we generally don't see certain prefixes anymore, such as `www`. 
  
    * However, having a subdomain can be useful. For example, storing cookies in a subdomain rather than a domain allows the scope via which they can be accessed to be narrower.

* HTTP status code responses include:
  * 200 OK
  * 301 Moved Permanently
  * 302 Found (temporary redirection)
  * 304 Not Modified (this code is sent when a webpage has not been modified since we last visited, meaning we can just use our cached version of the webpage)
  * 401 Unauthorized
  * 403 Forbidden
  * 404 Not Found
  * 418 I'm a Teapot (April Fools Joke!)
  * 500 Internal Server Error (logical or syntatic error in the code that someone has written)