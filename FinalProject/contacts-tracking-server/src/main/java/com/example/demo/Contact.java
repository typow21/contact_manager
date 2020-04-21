package com.example.demo;

import java.util.*;

public class Contact {
	
	public int id;
	public String firstName;
	public String lastName;
	public String phoneNumber;
	public String address;
	public String birthday;
	public List<Integer> relationships = new ArrayList<>();
	//public Dictionary<String, Integer> relationships;
	
	
	//Need create this constructor that takes no parameters because parameters are bing passed in in whatever order I want below
	// which isn't great.
	//The ObjectMapper will call this for us
	private Contact() {
		
		this.id = 0;
		this.firstName = null;
		this.lastName = null;
		this.phoneNumber = null;
		this.address = null;
		this.birthday = null;
		this.relationships = null;
		
	} 
	
	//Constructor 
	public Contact(int id, String firstName, String lastName, String phoneNumber, String address, List<Integer> relationships) {	
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.phoneNumber = phoneNumber;
		this.address = address;
		this.birthday = birthday;
		this.relationships = relationships;
			
	}

}
