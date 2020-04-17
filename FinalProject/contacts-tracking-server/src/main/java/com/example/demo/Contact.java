package com.example.demo;

import java.util.*;

public class Contact {
	
	public int id;
	public String firstName;
	public String lastName;
	public String phoneNumber;
	public String address;
	public String birthday;
	public List <String> relationships = new ArrayList<>();
	
	//Constructor 
	public Contact (String firstName, String lastName, String phoneNumber, 
			String address, int id) {
			
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.phoneNumber = phoneNumber;
		this.address = address;
		this.relationships = relationships;
			
	}

}
