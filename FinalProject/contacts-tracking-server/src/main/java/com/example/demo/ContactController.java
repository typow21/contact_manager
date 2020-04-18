package com.example.demo;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.PrintStream;
import java.util.*;
import java.lang.*;

@RestController
//@CrossOrigin(origins = "*")
public class ContactController {
	
	private final ContactsStore store;
	public ContactController(ContactsStore store) {
		
		this.store = store;
		
	}
	
	//Should line 31 be here?
	@CrossOrigin(origins = "*")
	@GetMapping("/new-contact")
	public Contact createContacts(@RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName, @RequestParam("phoneNumber") String phoneNumber, @RequestParam("address") String address, @RequestParam("birthday") String birthday) {
		
		return this.store.createContacts(firstName, lastName, phoneNumber, address, birthday);
		
	}
	//Should line 39 bere here?
	@CrossOrigin(origins = "*")
	@GetMapping("/load-contacts")
	public List <Contact> fetchContacts() {
		
		//Return all the contacts stored in the JSON file
		return store.fetchContacts();
		
	}
	
	//Should line 53 be here?
	@CrossOrigin(origins = "*")
	@DeleteMapping("/delete-contact/{contactId}")
	public void deleteContact(@PathVariable("contactId") int contactId) {
			
		this.store.deleteContact(contactId);
			
	}
	
	//Main does nothing in here, technically doesn't need to even be made but I have it here just to remind myself its not needed
	public static void main(String[] args) {
			
			

	}

}