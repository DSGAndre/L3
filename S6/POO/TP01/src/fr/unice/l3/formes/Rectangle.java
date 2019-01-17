package fr.unice.l3.formes;

import java.awt.Color;
import java.awt.Graphics;

public class Rectangle extends AFormeGeometrique {
	public Rectangle(Point coin, int largeur, int hauteur) {
		super(coin, largeur, hauteur);
		
	}
	
	@Override
	double surface() {
		return getLargeur()*getHauteur();
	}

	@Override
	double perimetre() {
		return 2*(getLargeur() + getHauteur());
	}

	@Override
	public void paintComponent(Graphics g) {
		super.paintComponent(g);
		/*getAncrage().paintComponent(g);
		Point coin = super.getCoinSuperieurGauche() ;*/
		System.out.println(g.toString());
		g.setColor(Color.RED);
		g.drawRect(0, 0, 50, 50);
		}
	
	@Override
	public String toString() {
		return "Rectangle"+super.toString();
	}
}
