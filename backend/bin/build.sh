#!/bin/bash

echo "Installing Pipenv..."
pip install pipenv

echo "Installing dependencies from Pipfile..."
pipenv install --system