package com.example.demo;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.PrintStream;
import java.util.*;
import java.lang.*;

@RestController
@CrossOrigin(origins = "*")
public class ContactController {
	
	private final ContactsStore store;
	public ContactController(ContactsStore store) {
		
		this.store = store;
		
	}
	
	@PostMapping("/new-contact")
	public Contact createContacts(@RequestBody Contact newContact) {
		
		return this.store.createContacts(newContact.firstName, newContact.lastName, newContact.phoneNumber, newContact.address, newContact.birthday);
		
	}
	
	@GetMapping("/load-contacts")
	public List <Contact> fetchContacts() {
		
		//Return all the contacts stored in the JSON file
		return store.fetchContacts();
		
	}
	
	@DeleteMapping("/delete-contact/{contactId}")
	public void deleteContact(@PathVariable("contactId") int contactId) {
			
		this.store.deleteContact(contactId);
			
	}
	
	@PutMapping("/edit-contact")
	public void editContact(@RequestBody Contact editContact) {
		
		this.store.editContact(editContact.id, editContact.firstName, editContact.lastName, editContact.phoneNumber, editContact.address, editContact.birthday);
		
	}
	
	//Main does nothing in here, technically doesn't need to even be made but I have it here just to remind myself its not needed
	public static void main(String[] args) {
			
			

	}

}