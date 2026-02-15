#!/usr/bin/env node

const chalk = require('chalk');
const inquirer = require('inquirer');

// Mock workflow data (same as marketplace)
const workflows = [
  {
    id: '1',
    title: 'Auto PR Reviewer',
    description: 'Automatically review pull requests with AI-powered insights',
    price: 29,
    rating: 4.8,
    installs: 2341,
    category: 'Code Review',
    tags: ['AI', 'Code Review', 'Automation']
  },
  {
    id: '2',
    title: 'Deploy Master',
    description: 'One-click deployment to multiple cloud providers',
    price: 49,
    rating: 4.9,
    installs: 892,
    category: 'CI/CD',
    tags: ['Deployment', 'DevOps', 'Cloud']
  },
  {
    id: '3',
    title: 'Test Suite Pro',
    description: 'Comprehensive testing workflow with coverage reports',
    price: 0,
    rating: 4.7,
    installs: 5678,
    category: 'Testing',
    tags: ['Testing', 'Coverage', 'Quality']
  },
  {
    id: '4',
    title: 'Security Scanner',
    description: 'Multi-layer security scanning for your repositories',
    price: 29,
    rating: 4.6,
    installs: 543,
    category: 'Security',
    tags: ['Security', 'Vulnerability']
  },
  {
    id: '5',
    title: 'Auto Docs Generator',
    description: 'Automatically generate documentation from code',
    price: 15,
    rating: 4.5,
    installs: 321,
    category: 'Documentation',
    tags: ['Docs', 'API', 'Automation']
  },
  {
    id: '6',
    title: 'ML Pipeline Runner',
    description: 'End-to-end ML pipeline with training and deployment',
    price: 49,
    rating: 4.9,
    installs: 654,
    category: 'AI & ML',
    tags: ['Machine Learning', 'ML', 'Pipeline']
  }
];

const categories = [
  'All Categories',
  'CI/CD',
  'Code Review', 
  'Testing',
  'Security',
  'Documentation',
  'AI & ML'
];

// CLI Banner
function showBanner() {
  console.log(chalk.cyan(`
  ╔═══════════════════════════════════════════╗
  ║     ⚡ AgentFlow CLI v1.0.0                ║
  ║     Workflow Marketplace in your Terminal ║
  ╚═══════════════════════════════════════════╝
  `));
}

// List workflows
function listWorkflows(filteredWorkflows) {
  console.log(chalk.white.bold('\n📦 Available Workflows:\n'));
  
  filteredWorkflows.forEach((wf, index) => {
    const price = wf.price === 0 ? chalk.green('FREE') : chalk.yellow(`$${wf.price}`);
    const stars = '★'.repeat(Math.floor(wf.rating)) + '☆'.repeat(5 - Math.floor(wf.rating));
    
    console.log(chalk.white(`${index + 1}. ${chalk.bold(wf.title)} ${chalk.gray('|')} ${price}`));
    console.log(chalk.gray(`   ${wf.description}`));
    console.log(chalk.yellow(`   ${stars} ${chalk.gray(wf.rating)} | ${chalk.cyan(wf.installs.toLocaleString()} installs)`));
    console.log(chalk.blue(`   Category: ${wf.category}`));
    console.log('');
  });
}

// Search workflows
async function searchWorkflows() {
  const { query } = await inquirer.prompt([
    {
      type: 'input',
      name: 'query',
      message: chalk.white('🔍 Search workflows:'),
      validate: (input) => input.length > 0 || 'Please enter a search term'
    }
  ]);

  const results = workflows.filter(wf => 
    wf.title.toLowerCase().includes(query.toLowerCase()) ||
    wf.description.toLowerCase().includes(query.toLowerCase()) ||
    wf.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );

  if (results.length === 0) {
    console.log(chalk.yellow('\n⚠️  No workflows found matching your search.\n'));
    return;
  }

  listWorkflows(results);
}

// Browse by category
async function browseByCategory() {
  const { category } = await inquirer.prompt([
    {
      type: 'list',
      name: 'category',
      message: chalk.white('📂 Select a category:'),
      choices: categories
    }
  ]);

  const filtered = category === 'All Categories' 
    ? workflows 
    : workflows.filter(wf => wf.category === category);

  listWorkflows(filtered);
}

// Show workflow details
async function showDetails() {
  const choices = workflows.map(wf => `${wf.title} (${wf.price === 0 ? 'Free' : '$' + wf.price})`);
  
  const { workflow } = await inquirer.prompt([
    {
      type: 'list',
      name: 'workflow',
      message: chalk.white('📄 Select a workflow to view details:'),
      choices: choices
    }
  ]);

  const selected = workflows.find(wf => workflow.startsWith(wf.title));
  
  console.log(chalk.white.bold(`\n📋 ${selected.title}\n`));
  console.log(chalk.gray('─'.repeat(50)));
  console.log(chalk.white(selected.description));
  console.log(chalk.gray('─'.repeat(50)));
  console.log(chalk.yellow(`   ★ Rating: ${selected.rating}/5`));
  console.log(chalk.cyan(`   📥 Installs: ${selected.installs.toLocaleString()}`));
  console.log(chalk.blue(`   📁 Category: ${selected.category}`));
  console.log(chalk.white(`   🏷️  Tags: ${selected.tags.join(', ')}`));
  console.log(chalk.green(`   💰 Price: ${selected.price === 0 ? 'FREE' : '$' + selected.price}`));
  console.log('');
}

// Install workflow (simulated)
async function installWorkflow() {
  const choices = workflows.map(wf => `${wf.title} (${wf.price === 0 ? 'Free' : '$' + wf.price})`);
  
  const { workflow } = await inquirer.prompt([
    {
      type: 'list',
      name: 'workflow',
      message: chalk.white('📥 Select a workflow to install:'),
      choices: choices
    }
  ]);

  const selected = workflows.find(wf => workflow.startsWith(wf.title));
  
  console.log(chalk.cyan('\n⏳ Installing workflow...\n'));
  
  // Simulate installation
  setTimeout(() => {
    console.log(chalk.green(`✅ Successfully installed "${selected.title}"!`));
    console.log(chalk.gray(`   Files copied to: .github/workflows/`));
    console.log(chalk.gray(`   Run: agentflow run ${selected.id}\n`));
  }, 1500);
}

// Show stats
function showStats() {
  const totalWorkflows = workflows.length;
  const totalInstalls = workflows.reduce((sum, wf) => sum + wf.installs, 0);
  const avgRating = (workflows.reduce((sum, wf) => sum + wf.rating, 0) / workflows.length).toFixed(1);
  const freeCount = workflows.filter(wf => wf.price === 0).length;

  console.log(chalk.white.bold('\n📊 AgentFlow Statistics:\n'));
  console.log(chalk.cyan(`   📦 Total Workflows: ${chalk.white(totalWorkflows)}`));
  console.log(chalk.cyan(`   📥 Total Installs: ${chalk.white(totalInstalls.toLocaleString())}`));
  console.log(chalk.cyan(`   ⭐ Average Rating: ${chalk.white(avgRating)}`));
  console.log(chalk.cyan(`   🎁 Free Workflows: ${chalk.green(freeCount)}`));
  console.log('');
}

// Main menu
async function mainMenu() {
  showBanner();

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: chalk.white('What would you like to do?'),
      choices: [
        '🔍 Search Workflows',
        '📂 Browse by Category', 
        '📋 View All Workflows',
        '📊 View Statistics',
        '📥 Install Workflow',
        '❌ Exit'
      ]
    }
  ]);

  switch (action) {
    case '🔍 Search Workflows':
      await searchWorkflows();
      break;
    case '📂 Browse by Category':
      await browseByCategory();
      break;
    case '📋 View All Workflows':
      listWorkflows(workflows);
      break;
    case '📊 View Statistics':
      showStats();
      break;
    case '📥 Install Workflow':
      await installWorkflow();
      break;
    case '❌ Exit':
      console.log(chalk.gray('\n👋 Thanks for using AgentFlow CLI!\n'));
      process.exit(0);
  }

  // Continue or exit
  const { continue: cont } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'continue',
      message: chalk.white('Continue?'),
      default: true
    }
  ]);

  if (cont) {
    console.clear();
    await mainMenu();
  } else {
    console.log(chalk.gray('\n👋 Thanks for using AgentFlow CLI!\n'));
    process.exit(0);
  }
}

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error(chalk.red('\n❌ Error:'), error.message);
  process.exit(1);
});

// Start CLI
mainMenu();
